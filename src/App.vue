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
      </div>

      <!-- Desktop -->
      <div v-else class="desktop">
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

      <!-- App Windows -->
      <AppWindow
        v-if="activeApp === 'projects'"
        title="Projects"
        @close="closeApp"
      >
        <p>Projects Content</p>
      </AppWindow>
      <AppWindow
        v-if="activeApp === 'aboutMe'"
        title="About Me"
        @close="closeApp"
      >
        <p>About Me Content</p>
      </AppWindow>
      <AppWindow
        v-if="activeApp === 'artGallery'"
        title="Art Gallery"
        @close="closeApp"
      >
        <p>Art Gallery Content</p>
      </AppWindow>
      <AppWindow
        v-if="activeApp === 'contact'"
        title="Contact"
        @close="closeApp"
      >
        <p>Contact Content</p>
      </AppWindow>
      <AppWindow
        v-if="activeApp === 'miniGame'"
        title="Mini Game"
        @close="closeApp"
      >
        <p>Mini Game Content</p>
      </AppWindow>
    </div>

    <!-- Taskbar -->
    <footer class="taskbar" v-if="loggedIn">
      <div class="taskbar-left-box">
        <img src="/src/assets/img/pfp.png" alt="Taskbar Icon" class="taskbar-image" />
      </div>
      <div class="taskbar-icons">
        <div
          class="taskbar-icon"
          :class="{ active: activeApp === 'projects' }"
          @click="openApp('projects')"
        >
          <img src="/src/assets/img/prj.png" alt="Projects" />
        </div>
        <div
          class="taskbar-icon"
          :class="{ active: activeApp === 'aboutMe' }"
          @click="openApp('aboutMe')"
        >
          <img src="/src/assets/img/abt.png" alt="About Me" />
        </div>
        <div
          class="taskbar-icon"
          :class="{ active: activeApp === 'artGallery' }"
          @click="openApp('artGallery')"
        >
          <img src="/src/assets/img/art.png" alt="Art Gallery" />
        </div>
        <div
          class="taskbar-icon"
          :class="{ active: activeApp === 'contact' }"
          @click="openApp('contact')"
        >
          <img src="/src/assets/img/cnc.png" alt="Contact" />
        </div>
        <div
          class="taskbar-icon"
          :class="{ active: activeApp === 'miniGame' }"
          @click="openApp('miniGame')"
        >
          <img src="/src/assets/img/game.png" alt="Mini Game" />
        </div>
      </div>
      <div class="taskbar-right">
        <div class="taskbar-item">{{ currentDate }}</div>
        <div class="taskbar-item">{{ currentTime }}</div>
      </div>
    </footer>
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
  },
  mounted() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  },
};
</script>