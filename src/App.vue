<template>
  <div id="app">
    <!-- Background -->
    <div class="background" :class="{ 'background-logged-in': loggedIn }">
      <!-- Login Screen -->
      <LoginScreen
        v-if="!loggedIn"
        @login="checkLoginState"
      />

      <!-- Desktop -->
      <Desktop v-else :openApp="openApp" />
    </div>

    <Taskbar
      v-if="loggedIn"
      :openApp="openApp"
      :currentTime="currentTime"
      :currentDate="currentDate"
      :commitSummary="commitSummary"
    />

    <!-- App Windows -->
  <!-- About me -->
    <AppWindow v-if="activeApp === 'aboutMe'" title="About Me" @close="closeApp">
      <AboutMe :aboutMeVideoSrc="'/src/assets/videos/templatevideo.mp4'" />
    </AppWindow>
  <!-- Contact -->
    <AppWindow v-if="activeApp === 'contact'" title="Contact" @close="closeApp">
      <Contact :contactForm="contactForm" />
    </AppWindow>
  <!-- Projects -->
    <AppWindow v-if="activeApp === 'projects'" title="Projects" @close="closeApp">
      <Projects :projects="projects" />
    </AppWindow>
  <!-- Socials -->
    <AppWindow v-if="activeApp === 'socials'" title="Socials" @close="closeApp">
      <Socials />
    </AppWindow>
  <!-- Artgallery -->
    <AppWindow v-if="activeApp === 'artGallery'" title="Art Gallery" @close="closeApp">
      <ArtGallery :images="artGalleryImages" />
    </AppWindow>
  <!-- Mini Game -->
    <AppWindow v-if="activeApp === 'miniGame'" title="Mini Game" @close="closeApp">
      <MiniGame
        :clickerScore="clickerScore"
        :upgrades="upgrades"
        :pointsPerClick="pointsPerClick"
        @increment-score="incrementScore"
        @purchase-upgrade="purchaseUpgrade"
      />
    </AppWindow>
  <!-- Settings -->
    <AppWindow v-if="activeApp === 'settings'" title="Settings" @close="closeApp">
      <Settings v-model:darkMode="darkMode" />
    </AppWindow>
  <!-- 3D Printing -->
    <AppWindow v-if="activeApp === 'threeDPrinting'" title="3D Printing" @close="closeApp">
      Lorem Ipsum
    </AppWindow>
  </div>
</template>

<script>
import LoginScreen from "./components/LoginScreen.vue";
import Desktop from "./components/Desktop.vue";
import Taskbar from "./components/Taskbar.vue";
import AppWindow from "./components/AppWindow.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFolder, faUser, faPalette, faEnvelope, faGamepad, faBars, faCog, faShareNodes, faCube } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram, faLinkedin, faGithub, faYoutube, faTiktok, faSpotify, faSteam, faCodepen } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import AboutMe from "./components/windows/AboutMe.vue";
import Projects from "./components/windows/Projects.vue";
import Contact from "./components/windows/Contact.vue";
import Socials from "./components/windows/Socials.vue";
import ArtGallery from "./components/windows/ArtGallery.vue";
import MiniGame from "./components/windows/MiniGame.vue";
import Settings from "./components/windows/Settings.vue";

library.add(faFolder, faUser, faPalette, faEnvelope, faGamepad, faBars, faCog, faShareNodes, faFacebook, faTwitter, faInstagram, faLinkedin, faGithub, faYoutube, faTiktok, faSpotify, faSteam, faCodepen, faCube);

export default {
  components: {
    LoginScreen,
    Desktop,
    Taskbar,
    AppWindow,
    FontAwesomeIcon,
    AboutMe,
    Projects,
    Contact,
    Socials,
    ArtGallery,
    MiniGame,
    Settings,
  },
  data() {
    return {
      loggedIn: false,
      activeApp: null,
      darkMode: false,
      currentDate: new Date().toLocaleDateString(), // Add currentDate
      commitSummary: __COMMIT_SUMMARY__, // Add commitSummary
    };
  },
  methods: {
    openApp(appName) {
      this.activeApp = this.activeApp === appName ? null : appName;
    },
    closeApp() {
      this.activeApp = null;
    },
    checkLoginState() {
      this.loggedIn = true; // Simply set loggedIn to true when the user enters 6 characters
    },
  },
  mounted() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  },
};
</script>

<style>

</style>
