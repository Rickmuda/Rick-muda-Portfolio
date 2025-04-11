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
        <!-- Commit Hash and Summary Message -->
        <div class="commit-hash-message">
          Version : {{ commitSummary }}
        </div>
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
        <div class="app-icon" @click="openApp('settings')">
          <div class="app-icon-image">
            <font-awesome-icon icon="cog" class="app-icon-inner" />
          </div>
          <div class="app-icon-text">Settings</div>
        </div>
      </div>
    </div>

    <!-- Taskbar -->
    <div v-if="loggedIn" class="taskbar">
      <div
        class="taskbar-left-box"
        @mouseover="openStartMenu"
        @mouseleave="closeStartMenu"
      >
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
        <div class="taskbar-icon" @click="openApp('settings')">
          <font-awesome-icon icon="cog" />
        </div>
      </div>
      <div class="taskbar-right">
        <div class="taskbar-item">{{ currentTime }}</div>
        <div class="taskbar-item">{{ currentDate }}</div>
      </div>
    </div>

    <!-- Start Menu -->
    <div
      v-if="startMenuOpen"
      class="start-menu"
      @mouseover="keepStartMenuOpen"
      @mouseleave="closeStartMenu"
    >
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
      :class="{ 'scrollable-app': activeApp === 'artGallery' }"
    >
      <div v-if="activeApp === 'projects'" class="projects-window">
        <!-- Projects Grid -->
        <div
          class="projects-grid"
          :class="{ 'grid-expanded': selectedProject }"
        >
          <div
            v-for="(project, index) in projects"
            :key="index"
            class="project-card"
            :class="{ selected: selectedProject === project }"
            @click="selectProject(project)"
          >
            <img :src="project.image" alt="Project Image" />
            <p>{{ project.title }}</p>
          </div>
        </div>

        <!-- Project Details -->
        <div v-if="selectedProject" class="project-details">
          <img :src="selectedProject.image" alt="Selected Project Image" />
          <h3>{{ selectedProject.title }}</h3>
          <p>{{ selectedProject.description }}</p>
          <a
            :href="selectedProject.link"
            target="_blank"
            class="project-link"
          >
            Go to Project
          </a>
        </div>
      </div>
      <div v-if="activeApp === 'aboutMe'">
        <div class="about-me">
          <div class="video-container">
            <video
              ref="aboutMeVideo"
              class="about-me-video"
              :src="aboutMeVideoSrc"
              @timeupdate="updateVideoTime"
              @ended="handleVideoEnd"
            ></video>
          </div>
          <div class="video-controls">
            <button @click="togglePlayPause">{{ isPlaying ? 'Pause' : 'Play' }}</button>
            <input type="range" min="0" :max="videoDuration" step="0.1" v-model="videoCurrentTime" @input="seekVideo" />
            <input type="range" min="0" max="1" step="0.1" v-model="volume" @input="adjustVolume" />
          </div>
        </div>
      </div>
      <div v-if="activeApp === 'artGallery'">
        <div class="art-gallery">
          <div class="gallery-grid">
            <div
              v-for="(image, index) in artGalleryImages"
              :key="index"
              class="gallery-item"
              @click="openImage(image)"
            >
              <img :src="image" alt="Art" class="gallery-image" />
            </div>
          </div>
          <div v-if="selectedImage" class="image-modal" @click="closeImage">
            <img :src="selectedImage" alt="Selected Art" class="modal-image" />
          </div>
        </div>
      </div>
      <div v-if="activeApp === 'contact'">
        <p>Welcome to the Contact app!</p>
      </div>
      <div v-if="activeApp === 'miniGame'">
        <p>Welcome to the Mini Game app!</p>
      </div>
      <div v-if="activeApp === 'settings'">
        <div class="settings">
          <label class="dark-mode-toggle">
            <input type="checkbox" v-model="darkMode" @change="toggleDarkMode" />
            <span class="slider"></span>
            <span class="label-text">Dark Mode</span>
          </label>
        </div>
      </div>
    </AppWindow>
  </div>
</template>

<script>
import AppWindow from "./components/AppWindow.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFolder, faUser, faPalette, faEnvelope, faGamepad, faBars, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Add icons to the library
library.add(faFolder, faUser, faPalette, faEnvelope, faGamepad, faBars, faCog);

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
      currentTime: new Date().toLocaleTimeString(), // For the taskbar clock
      activeApp: null,
      startMenuOpen: false,
      showHelpPopup: false,
      commitHash: __COMMIT_HASH__, // Injected commit hash
      commitSummary: __COMMIT_SUMMARY__, // Injected commit summary
      aboutMeVideoSrc: "/src/assets/videos/templatevideo.mp4",
      isPlaying: false,
      videoDuration: 0,
      videoCurrentTime: 0, // Renamed for the video
      volume: 1,
      artGalleryImages: [
        "/src/assets/imggallery/fnf.png",
        "/src/assets/imggallery/panels.jpg",
        "/src/assets/imggallery/pepe.png",
        "/src/assets/imggallery/room.jpg",
        "/src/assets/imggallery/vtuber.png",
      ],
      selectedImage: null, // For the modal
      darkMode: false, // Track the dark mode state
      selectedProject: null, // Track the selected project
      projects: [
        {
          title: "Project 1",
          image: "/src/assets/imggallery/fnf.png",
          description: "This is a description of Project 1.",
          link: "https://example.com/project1",
        },
        {
          title: "Project 2",
          image: "/src/assets/imggallery/panels.jpg",
          description: "This is a description of Project 2.",
          link: "https://example.com/project2",
        },
        {
          title: "Project 3",
          image: "/src/assets/imggallery/pepe.png",
          description: "This is a description of Project 3.",
          link: "https://example.com/project3",
        },
        {
          title: "Project 4",
          image: "/src/assets/imggallery/room.jpg",
          description: "This is a description of Project 4.",
          link: "https://example.com/project4",
        },
        {
          title: "Project 5",
          image: "/src/assets/imggallery/vtuber.png",
          description: "This is a description of Project 5.",
          link: "https://example.com/project5",
        },
      ],
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
        settings: "Settings",
      };
      return titles[this.activeApp] || "No App Selected";
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
    openStartMenu() {
      this.startMenuOpen = true; // Open the Start Menu
    },
    closeStartMenu() {
      this.startMenuOpen = false; // Close the Start Menu
    },
    keepStartMenuOpen() {
      this.startMenuOpen = true; // Keep the Start Menu open when hovering over it
    },
    toggleHelpPopup() {
      this.showHelpPopup = !this.showHelpPopup;
    },
    togglePlayPause() {
      const video = this.$refs.aboutMeVideo;
      if (video.paused) {
        video.play();
        this.isPlaying = true;
      } else {
        video.pause();
        this.isPlaying = false;
      }
    },
    updateVideoTime() {
      const video = this.$refs.aboutMeVideo;
      this.videoCurrentTime = video.currentTime; // Updated to use videoCurrentTime
      this.videoDuration = video.duration;
    },
    seekVideo() {
      const video = this.$refs.aboutMeVideo;
      video.currentTime = this.videoCurrentTime; // Updated to use videoCurrentTime
    },
    adjustVolume() {
      const video = this.$refs.aboutMeVideo;
      video.volume = this.volume;
    },
    handleVideoEnd() {
      const video = this.$refs.aboutMeVideo;
      video.pause(); // Ensure the video stops
      this.isPlaying = false; // Update the play state
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
    openImage(image) {
      this.selectedImage = image; // Open the modal with the selected image
    },
    closeImage() {
      this.selectedImage = null; // Close the modal
    },
    toggleDarkMode() {
      // Update the background image based on the dark mode state
      const background = document.querySelector(".background");
      if (this.darkMode) {
        background.style.backgroundImage = "url('/src/assets/imggallery/roomdark.png')";
      } else {
        background.style.backgroundImage = "url('/src/assets/imggallery/room.jpg')";
      }
    },
    applyDarkModeBasedOnTime() {
      const currentHour = new Date().getHours();
      this.darkMode = currentHour >= 18; // Enable dark mode if it's 6 PM or later
      this.toggleDarkMode(); // Apply the background change
    },
    selectProject(project) {
      this.selectedProject = this.selectedProject === project ? null : project;
    },
  },
  mounted() {
    // Automatically apply dark mode based on the time
    this.applyDarkModeBasedOnTime();

    // Update the taskbar clock every second
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString(); // Taskbar clock
    }, 1000);
  },
};
</script>

<style>

</style>
