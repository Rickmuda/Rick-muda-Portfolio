<template>
  <div id="app">
    <router-view />
    <!-- Background -->
    <div class="background" :class="{ 'background-logged-in': loggedIn, 'dark-mode': darkMode }">
      <!-- Login Screen -->
      <LoginScreen v-if="!loggedIn" @login="checkLoginState" />

      <!-- Desktop -->
      <Desktop v-else :openApp="openApp" />
    </div>
    <!-- Taskbar -->
    <Taskbar v-if="loggedIn" :openApp="openApp" :commitSummary="commitSummary" />

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

    <!-- Easter Egg Message -->
    <div v-if="easterEggTriggered" class="easter-egg-message">
      🎉 Konami Code Activated! 🎉
    </div>
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
      openWindows: [], // Track currently open windows
      darkMode: false, // Default dark mode state
      currentLanguage: "en", // Default language
      currentDate: new Date().toLocaleDateString(),
      commitSummary: __COMMIT_SUMMARY__,
      aboutMeVideoSrc: "/src/assets/videos/about-me.mp4", // Example video source
      zIndexCounter: 10, // Initial z-index value for windows
      windowZIndices: {}, // Track z-index for each window
      konamiCode: [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
      ],
      currentInput: [],
      easterEggTriggered: false,
    };
  },
  computed: {
    windowConfig() {
      return windowConfig; // Expose the window configuration
    },
  },
  methods: {
    openApp(appName) {
      if (this.openWindows.includes(appName)) {
        // If the window is already open, close it
        this.closeApp(appName);
      } else {
        // Otherwise, open the window
        this.openWindows.push(appName); // Add the app to the open windows list
        this.windowZIndices[appName] = this.zIndexCounter++; // Assign a z-index to the new window
      }
    },
    closeApp(appName) {
      this.openWindows = this.openWindows.filter((window) => window !== appName); // Remove the app from the open windows list
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
      return windowConfig[windowName]?.props || {};
    },
    handleKeydown(event) {
      this.currentInput.push(event.key);
      if (this.currentInput.length > this.konamiCode.length) {
        this.currentInput.shift(); // Keep the input array the same length as the Konami Code
      }
      if (this.currentInput.join("") === this.konamiCode.join("")) {
        this.triggerEasterEgg();
      }
    },
    triggerEasterEgg() {
      this.easterEggTriggered = true;

      // Open the "Old Video" app
      if (!this.openWindows.includes("oldVideo")) {
        this.openApp("oldVideo");
      }

      setTimeout(() => {
        this.easterEggTriggered = false; // Reset after a few seconds
      }, 5000);
    },
  },
  mounted() {
    // Set dark mode based on the current time when the app loads
    this.setDarkModeBasedOnTime();

    // Check the time every minute to update dark mode automatically
    setInterval(() => {
      this.setDarkModeBasedOnTime();
    }, 60000); // Check every 60 seconds

    // Add keydown event listener for Konami Code
    window.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    // Remove keydown event listener to avoid memory leaks
    window.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>