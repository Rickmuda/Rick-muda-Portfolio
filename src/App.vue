<template>
  <div id="app">
    <router-view />
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
      v-for="(window, index) in openWindows"
      :key="index"
      :title="$t(windowConfig[window].title)"
      :defaultWidth="windowConfig[window].defaultWidth"
      :defaultHeight="windowConfig[window].defaultHeight"
      :defaultX="windowConfig[window].defaultX"
      :defaultY="windowConfig[window].defaultY"
      :zIndex="windowZIndices[window]" 
      @close="closeApp(window)"
      @bringToFront="bringWindowToFront(window)" 
    >
      <!-- Pass props dynamically based on the window -->
      <component
        :is="windowConfig[window].component"
        v-bind="getWindowProps(window)"
      />
    </AppWindow>
  </div>
</template>

<script>
import LoginScreen from "./components/LoginScreen.vue";
import Desktop from "./components/Desktop.vue";
import Taskbar from "./components/Taskbar.vue";
import AppWindow from "./components/AppWindow.vue";
import { windowConfig } from "./windowConfig";

export default {
  components: {
    LoginScreen,
    Desktop,
    Taskbar,
    AppWindow,
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
      guestbookEntries: [], // New state for guestbook entries
      guestbookLoading: true, // Track loading state
      guestbookError: null // Track any errors
    };
  },
  computed: {
    windowConfig() {
      return windowConfig; // Expose the window configuration
    },
  },
  methods: {
    openApp(appName) {
      console.log(`openApp called for: ${appName}`); // Debugging log

      // Check if the window is already open
      if (this.openWindows.includes(appName)) {
        console.log(`The window "${appName}" is already open. Closing it.`); // Debugging log
        this.closeApp(appName); // Close the window if it's already open
        return;
      }

      // Otherwise, open the window
      this.openWindows.push(appName);
      this.windowZIndices[appName] = this.zIndexCounter++; // Assign a z-index to the new window
    },
    closeApp(appName) {
      // Remove the app from the open windows list
      this.openWindows = this.openWindows.filter((window) => window !== appName);
      delete this.windowZIndices[appName]; // Remove its z-index tracking
    },
    checkLoginState() {
      this.loggedIn = true; // Simply set loggedIn to true when the user enters 6 characters
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode; // Toggle dark mode manually
    },
    setDarkModeBasedOnTime() {
      const currentHour = new Date().getHours();
      this.darkMode = currentHour >= 18 || currentHour < 6; // Enable dark mode after 6 PM and before 6 AM
    },
    bringWindowToFront(appName) {
      this.windowZIndices[appName] = this.zIndexCounter++; // Update the z-index to bring the window to the front
    },
    getWindowProps(windowName) {
      // Return props specific to the window
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
          onEntryAdded: this.fetchGuestbookEntries // Refresh entries when a new one is added
        };
      }
      return windowConfig[windowName]?.props || {};
    },
    handleKeydown(event) {
      // Debounce logic to prevent rapid triggering
      if (this.easterEggTriggered) return;

      this.currentInput.push(event.key);
      if (this.currentInput.length > this.konamiCode.length) {
        this.currentInput.shift(); // Keep the input array the same length as the Konami Code
      }
      if (this.currentInput.join("") === this.konamiCode.join("")) {
        this.triggerEasterEgg();
      }
    },
    triggerEasterEgg() {
      if (this.easterEggTriggered) {
        return; // Prevent multiple triggers
      }

      this.easterEggTriggered = true; // Set the flag to true
      console.log("Easter Egg Triggered!"); // Log to console for debugging

      // Add the "Old Video" app to the easter egg apps list if not already added
      if (!this.easterEggApps.includes("oldVideo")) {
        this.easterEggApps.push("oldVideo");
      }
    },
    async fetchGuestbookEntries() {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/guestbook`);
        if (!response.ok) throw new Error('Failed to fetch entries');
        this.guestbookEntries = await response.json();
      } catch (error) {
        console.error('Error fetching guestbook entries:', error);
        this.guestbookError = error.message;
      } finally {
        this.guestbookLoading = false;
      }
    },
  },
  async mounted() {
    // Set dark mode based on the current time when the app loads
    this.setDarkModeBasedOnTime();

    // Check the time every minute to update dark mode automatically
    setInterval(() => {
      this.setDarkModeBasedOnTime();
    }, 43200); // Check every 12 hours

    // Add keydown event listener for Konami Code
    if (!this.keydownListenerAdded) {
      console.log("Adding keydown listener"); // Debugging log
      window.addEventListener("keydown", this.handleKeydown);
      this.keydownListenerAdded = true; // Track that the listener has been added
    }

    // Fetch guestbook entries when app mounts
    await this.fetchGuestbookEntries();
  },
  beforeUnmount() {
    // Remove keydown event listener to avoid memory leaks
    if (this.keydownListenerAdded) {
      console.log("Removing keydown listener"); // Debugging log
      window.removeEventListener("keydown", this.handleKeydown);
      this.keydownListenerAdded = false; // Track that the listener has been removed
    }
  },
};
</script>