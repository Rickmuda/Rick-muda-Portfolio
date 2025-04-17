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
      @close="closeApp(window)"
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
      openWindows: [], // Track currently open windows
      darkMode: false,
      currentLanguage: "en", // Default language
      currentDate: new Date().toLocaleDateString(),
      commitSummary: __COMMIT_SUMMARY__,
      aboutMeVideoSrc: "src\assets\videos\portfoliovideo.mov", // Example video source
    };
  },
  methods: {
    openApp(appName) {
      if (!this.openWindows.includes(appName)) {
        this.openWindows.push(appName); // Add the app to the open windows list
      }
    },
    closeApp(appName) {
      this.openWindows = this.openWindows.filter((window) => window !== appName); // Remove the app from the open windows list
    },
    checkLoginState() {
      this.loggedIn = true; // Simply set loggedIn to true when the user enters 6 characters
    },
    getWindowProps(window) {
      // Return props dynamically based on the window
      switch (window) {
        case "aboutMe":
          return { aboutMeVideoSrc: this.aboutMeVideoSrc };
        case "settings":
          return {
            darkMode: this.darkMode,
            currentLanguage: this.currentLanguage,
            "onUpdate:darkMode": (value) => (this.darkMode = value),
            "onUpdate:currentLanguage": (value) =>
              (this.currentLanguage = value),
          };
        default:
          return {};
      }
    },
  },
  computed: {
    windowConfig() {
      return windowConfig; // Expose the window configuration
    },
  },
};
</script>