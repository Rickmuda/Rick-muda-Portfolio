<template>
  <div class="taskbar">
    <!-- Left Box -->
    <div class="taskbar-left-box" @mouseover="openStartMenu" @mouseleave="closeStartMenu">
      <img src="/src/assets/img/pfp.png" alt="Profile Picture" class="taskbar-image" />
    </div>

    <!-- Icons -->
    <div class="taskbar-icons">
      <div class="taskbar-icon" @click="openApp('aboutMe')">
        <font-awesome-icon icon="user" />
      </div>
      <div class="taskbar-icon" @click="openApp('projects')">
        <font-awesome-icon icon="folder" />
      </div>
      <div class="taskbar-icon" @click="openApp('contact')">
        <font-awesome-icon icon="envelope" />
      </div>
      <div class="taskbar-icon" @click="openApp('socials')">
        <font-awesome-icon icon="share-nodes" />
      </div>
      <div class="taskbar-icon" @click="openApp('miniGame')">
        <font-awesome-icon icon="gamepad" />
      </div>
      <div class="taskbar-icon" @click="openApp('artGallery')">
        <font-awesome-icon icon="palette" />
      </div>
      <div class="taskbar-icon" @click="openApp('settings')">
        <font-awesome-icon icon="cog" />
      </div>
      <!-- 3D print support keuzedeel portfolio -->
      <!-- <div class="taskbar-icon" @click="openApp('threeDPrinting')">
        <font-awesome-icon icon="cube" />
      </div> -->
    </div>

    <!-- Right Box -->
    <div class="taskbar-right">
      <div class="taskbar-item">{{ currentTime }}</div>
      <div class="taskbar-item">{{ currentDate }}</div>
    </div>

    <!-- Start Menu -->
    <StartMenu
      v-if="startMenuOpen"
      :commitSummary="commitSummary"
      @mouseover="keepStartMenuOpen"
      @mouseleave="closeStartMenu"
    />
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import StartMenu from "./StartMenu.vue";

export default {
  props: {
    openApp: {
      type: Function,
      required: true,
    },
    commitSummary: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      currentTime: new Date().toLocaleTimeString(),
      startMenuOpen: false,
    };
  },
  methods: {
    openStartMenu() {
      this.startMenuOpen = true;
    },
    closeStartMenu() {
      this.startMenuOpen = false;
    },
    keepStartMenuOpen() {
      this.startMenuOpen = true;
    },
    updateTime() {
      this.currentTime = new Date().toLocaleTimeString();
      this.currentDate = new Date().toLocaleDateString();
    },
  },
  mounted() {
    setInterval(this.updateTime, 1000); // Update time every second
  },
  components: {
    FontAwesomeIcon,
    StartMenu,
  },
};
</script>

<style scoped>
/* Add any specific styles for the taskbar and start menu here */
</style>
