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
          <img src="/src/assets/img/prj.png" alt="Projects" class="app-icon-image" />
          <div class="app-icon-text">Projects</div>
        </div>
        <div class="app-icon" @click="openApp('aboutMe')">
          <img src="/src/assets/img/abt.png" alt="About Me" class="app-icon-image" />
          <div class="app-icon-text">About Me</div>
        </div>
        <div class="app-icon" @click="openApp('artGallery')">
          <img src="/src/assets/img/art.png" alt="Art Gallery" class="app-icon-image" />
          <div class="app-icon-text">Art Gallery</div>
        </div>
        <div class="app-icon" @click="openApp('contact')">
          <img src="/src/assets/img/cnc.png" alt="Contact" class="app-icon-image" />
          <div class="app-icon-text">Contact</div>
        </div>
        <div class="app-icon" @click="openApp('miniGame')">
          <img src="/src/assets/img/game.png" alt="Mini Game" class="app-icon-image" />
          <div class="app-icon-text">Mini Game</div>
        </div>
      </div>
    </div>

    <!-- Taskbar -->
    <div v-if="loggedIn" class="taskbar">
      <div class="taskbar-left-box">
        <img src="/src/assets/img/pfp.png" alt="Profile Picture" class="taskbar-image" />
      </div>
      <div class="taskbar-icons">
        <!-- Add desktop icons as taskbar icons -->
        <div class="taskbar-icon" @click="openApp('projects')">
          <img src="/src/assets/img/prj.png" alt="Projects" />
        </div>
        <div class="taskbar-icon" @click="openApp('aboutMe')">
          <img src="/src/assets/img/abt.png" alt="About Me" />
        </div>
        <div class="taskbar-icon" @click="openApp('artGallery')">
          <img src="/src/assets/img/art.png" alt="Art Gallery" />
        </div>
        <div class="taskbar-icon" @click="openApp('contact')">
          <img src="/src/assets/img/cnc.png" alt="Contact" />
        </div>
        <div class="taskbar-icon" @click="openApp('miniGame')">
          <img src="/src/assets/img/game.png" alt="Mini Game" />
        </div>
      </div>
      <div class="taskbar-right">
        <div class="taskbar-item">{{ currentTime }}</div>
        <div class="taskbar-item">{{ currentDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import AppWindow from "./components/AppWindow.vue";

export default {
  components: {
    AppWindow,
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
      this.activeApp = appName; // Set the active app
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