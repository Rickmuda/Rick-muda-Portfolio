<template>
  <div id="app">
    <!-- Background -->
    <div class="background" :class="{ 'background-logged-in': loggedIn }">
      <!-- Login Screen -->
      <div v-if="!loggedIn" class="login-screen">
        <div class="center-box">
          <img src="/src/assets/img/pfp.png" alt="Profile Picture" class="center-image" />
        </div>
        <div class="password-box">
          <input
            type="password"
            class="password-input"
            placeholder="Enter password to log in"
            v-model="passwordInput"
          />
        </div>
        <button class="help-button" @click="toggleHelpPopup">?</button>
      </div>

      <!-- Help Popup -->
      <div v-if="showHelpPopup" class="help-popup">
        <div class="help-popup-content">
          <p>Fun fact, this is my first vue.js project and I made this in a week.</p>
          <button @click="toggleHelpPopup">Close</button>
        </div>
      </div>

      <!-- Desktop -->
      <div v-if="loggedIn" class="desktop">
        <!-- App Icons -->
        <div class="app-icon" @click="openApp('projects')">
          <div class="app-icon-image">
            <font-awesome-icon icon="folder" class="app-icon-inner" />
          </div>
          <div class="app-icon-text">Projects</div>
        </div>
        <div class="app-icon" @click="openApp('aboutMe')">
          <div class="app-icon-image">
            <font-awesome-icon icon="user" class="app-icon-inner" />
          </div>
          <div class="app-icon-text">About Me</div>
        </div>
        <div class="app-icon" @click="openApp('artGallery')">
          <div class="app-icon-image">
            <font-awesome-icon icon="palette" class="app-icon-inner" />
          </div>
          <div class="app-icon-text">Art Gallery</div>
        </div>
        <div class="app-icon" @click="openApp('contact')">
          <div class="app-icon-image">
            <font-awesome-icon icon="envelope" class="app-icon-inner" />
          </div>
          <div class="app-icon-text">Contact</div>
        </div>
        <div class="app-icon" @click="openApp('miniGame')">
          <div class="app-icon-image">
            <font-awesome-icon icon="gamepad" class="app-icon-inner" />
          </div>
          <div class="app-icon-text">Mini Game</div>
        </div>
      </div>
    </div>

    <!-- Taskbar -->
    <div v-if="loggedIn" class="taskbar">
      <div class="taskbar-left-box" @click="toggleStartMenu">
        <img src="/src/assets/img/pfp.png" alt="Profile Picture" class="taskbar-image" />
      </div>
      <div class="taskbar-icons">
        <!-- Add desktop icons as taskbar icons -->
        <div class="taskbar-icon" @click="openApp('projects')">
          <font-awesome-icon icon="folder" />
        </div>
        <div class="taskbar-icon" @click="openApp('aboutMe')">
          <font-awesome-icon icon="user" />
        </div>
        <div class="taskbar-icon" @click="openApp('artGallery')">
          <font-awesome-icon icon="palette" />
        </div>
        <div class="taskbar-icon" @click="openApp('contact')">
          <font-awesome-icon icon="envelope" />
        </div>
        <div class="taskbar-icon" @click="openApp('miniGame')">
          <font-awesome-icon icon="gamepad" />
        </div>
      </div>
      <div class="taskbar-right">
        <div class="taskbar-item">{{ currentTime }}</div>
        <div class="taskbar-item">{{ currentDate }}</div>
      </div>
    </div>

    <!-- Start Menu -->
    <div v-if="startMenuOpen" class="start-menu">
      <div class="start-menu-topbar">Start Menu</div>
      <div class="start-menu-content">
        <p>Welcome to the Start Menu!</p>
        <p>Here you can access various features.</p>
      </div>
    </div>

    <!-- App Window -->
    <AppWindow
      v-if="activeApp"
      :title="activeAppTitle"
      @close="closeApp"
    >
      <div v-if="activeApp === 'projects'">
        <p>Welcome to the Projects app!</p>
      </div>
      <div v-if="activeApp === 'aboutMe'">
        <p>Welcome to the About Me app!</p>
      </div>
      <div v-if="activeApp === 'artGallery'">
        <p>Welcome to the Art Gallery app!</p>
      </div>
      <div v-if="activeApp === 'contact'">
        <p>Welcome to the Contact app!</p>
      </div>
      <div v-if="activeApp === 'miniGame'">
        <p>Welcome to the Mini Game app!</p>
      </div>
    </AppWindow>
  </div>
</template>

<script>
import AppWindow from "./components/AppWindow.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFolder, faUser, faPalette, faEnvelope, faGamepad, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Add icons to the library
library.add(faFolder, faUser, faPalette, faEnvelope, faGamepad, faBars);

export default {
  components: {
    AppWindow,
    FontAwesomeIcon,
  },
  data() {
    return {
      loggedIn: false,
      passwordInput: "",
      currentDate: new Date().toLocaleDateString(),
      currentTime: new Date().toLocaleTimeString(),
      activeApp: null, // Tracks the currently open app
      startMenuOpen: false, // Tracks whether the Start Menu is open
      showHelpPopup: false, // Tracks the visibility of the help popup
    };
  },
  computed: {
    activeAppTitle() {
      const titles = {
        projects: "Projects",
        aboutMe: "About Me",
        artGallery: "Art Gallery",
        contact: "Contact",
        miniGame: "Mini Game",
      };
      return titles[this.activeApp] || "App";
    },
  },
  watch: {
    passwordInput(newValue) {
      // Check if the password input has 6 or more characters
      if (newValue.length >= 6) {
        this.loggedIn = true; // Log the user in
        this.passwordInput = ""; // Clear the input field
      }
    },
  },
  methods: {
    openApp(appName) {
      // Toggle the app window: close if already active, open otherwise
      this.activeApp = this.activeApp === appName ? null : appName;
    },
    closeApp() {
      this.activeApp = null; // Close the active app
    },
    toggleStartMenu() {
      this.startMenuOpen = !this.startMenuOpen; // Toggle the Start Menu
    },
    toggleHelpPopup() {
      this.showHelpPopup = !this.showHelpPopup;
    },
  },
  mounted() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  },
};
</script>
