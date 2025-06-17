<template>
  <div id="app">
    <!-- Router View for Error Pages -->
    <router-view v-if="$route.name === 'NotFound'" />

    <!-- Main App Content -->
    <template v-else>
      <!-- Background -->
      <div class="background" :class="{ 'background-logged-in': loggedIn, 'dark-mode': darkMode }">
        <!-- Login Screen -->
        <LoginScreen v-if="!loggedIn" @login="checkLoginState" />

        <!-- Desktop -->
        <Desktop v-else :openApp="openApp" :easterEggApps="easterEggApps" />
      </div>

      <!-- Taskbar -->
      <Taskbar
        v-if="loggedIn"
        :openApp="openApp"
        :commitSummary="commitSummary"
        :commitDescription="commitDescription"
        :easterEggApps="easterEggApps"
        :easterEggTriggered="easterEggTriggered" 
      />

      <!-- Dynamic App Windows -->
      <AppWindow
        v-for="window in openWindows"
        :key="window"
        :title="$t(windowConfig[window].title)"
        :defaultWidth="windowConfig[window].defaultWidth"
        :defaultHeight="windowConfig[window].defaultHeight"
        :defaultX="windowConfig[window].defaultX"
        :defaultY="windowConfig[window].defaultY"
        :zIndex="windowZIndices[window]" 
        @close="closeApp(window)"
        @bringToFront="bringWindowToFront(window)" 
      >
        <component
          :is="windowConfig[window].component"
          v-bind="getWindowProps(window)"
        />
      </AppWindow>

      <!-- Under Development Modal -->
      <UnderDevelopment 
        v-if="showUnderDevelopment" 
        @close="closeUnderDevelopment" 
      />
    </template>
  </div>
</template>

<script>
import LoginScreen from "./components/LoginScreen.vue";
import Desktop from "./components/Desktop.vue";
import Taskbar from "./components/Taskbar.vue";
import AppWindow from "./components/AppWindow.vue";
import UnderDevelopment from "./components/UnderDevelopment.vue";
import { windowConfig } from "./windowConfig";

export default {
  name: 'App',
  components: {
    LoginScreen,
    Desktop,
    Taskbar,
    AppWindow,
    UnderDevelopment,
  },
  data() {
    return {
      loggedIn: false,
      openWindows: [],
      darkMode: false,
      currentLanguage: "en",
      currentDate: new Date().toLocaleDateString(),
      commitSummary: __COMMIT_SUMMARY__,
      commitDescription: __COMMIT_DESCRIPTION__,
      zIndexCounter: 10,
      windowZIndices: {},
      konamiCode: ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
      currentInput: [],
      easterEggTriggered: false,
      keydownListenerAdded: false,
      easterEggApps: [],
      guestbookEntries: [],
      guestbookLoading: true,
      guestbookError: null,
      showUnderDevelopment: false,
      unfinishedApps: ['threeDPrinting'],
    };
  },
  computed: {
    windowConfig() {
      return windowConfig;
    },
  },
  methods: {
    openApp(appName) {
      if (this.unfinishedApps.includes(appName)) {
        this.showUnderDevelopment = true;
        return;
      }

      if (this.openWindows.includes(appName)) {
        this.closeApp(appName);
        return;
      }

      this.openWindows.push(appName);
      this.windowZIndices[appName] = this.zIndexCounter++;
    },
    closeApp(appName) {
      this.openWindows = this.openWindows.filter(window => window !== appName);
      delete this.windowZIndices[appName];
    },
    checkLoginState() {
      this.loggedIn = true;
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
    setDarkModeBasedOnTime() {
      const currentHour = new Date().getHours();
      this.darkMode = currentHour >= 18 || currentHour < 6;
    },
    bringWindowToFront(appName) {
      this.windowZIndices[appName] = this.zIndexCounter++;
    },
    getWindowProps(windowName) {
      if (windowName === "settings") {
        return {
          darkMode: this.darkMode,
          currentLanguage: this.currentLanguage,
          "onUpdate:darkMode": (value) => (this.darkMode = value),
          "onUpdate:currentLanguage": (value) => (this.currentLanguage = value),
        };
      }
      if (windowName === "guestbook") {
        return {
          entries: this.guestbookEntries,
          isLoading: this.guestbookLoading,
          error: this.guestbookError,
          onEntryAdded: this.fetchGuestbookEntries
        };
      }
      return windowConfig[windowName]?.props || {};
    },
    handleKeydown(event) {
      if (this.easterEggTriggered) return;

      this.currentInput.push(event.key);
      if (this.currentInput.length > this.konamiCode.length) {
        this.currentInput.shift();
      }
      if (this.currentInput.join("") === this.konamiCode.join("")) {
        this.triggerEasterEgg();
      }
    },
    triggerEasterEgg() {
      if (this.easterEggTriggered) return;

      this.easterEggTriggered = true;
      if (!this.easterEggApps.includes("oldVideo")) {
        this.easterEggApps.push("oldVideo");
      }
    },
    async fetchGuestbookEntries() {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        if (baseUrl) {
          const response = await fetch(`${baseUrl}/guestbook`);
          if (!response.ok) throw new Error('Failed to fetch entries');
          this.guestbookEntries = await response.json();
        } else {
          const saved = localStorage.getItem('guestbookEntries');
          this.guestbookEntries = saved ? JSON.parse(saved) : [];
        }
      } catch (error) {
        console.error('Error fetching guestbook entries:', error);
        const saved = localStorage.getItem('guestbookEntries');
        this.guestbookEntries = saved ? JSON.parse(saved) : [];
        this.guestbookError = error.message;
      } finally {
        this.guestbookLoading = false;
      }
    },
    closeUnderDevelopment() {
      this.showUnderDevelopment = false;
    },
  },
  async mounted() {
    this.setDarkModeBasedOnTime();

    setInterval(() => {
      this.setDarkModeBasedOnTime();
    }, 43200000);

    if (!this.keydownListenerAdded) {
      window.addEventListener("keydown", this.handleKeydown);
      this.keydownListenerAdded = true;
    }

    await this.fetchGuestbookEntries();
  },
  beforeUnmount() {
    if (this.keydownListenerAdded) {
      window.removeEventListener("keydown", this.handleKeydown);
      this.keydownListenerAdded = false;
    }
  },
};
</script>