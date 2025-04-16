<template>
  <div id="app">
    <router-view />
    <!-- Background -->
    <div class="background" :class="{ 'background-logged-in': loggedIn, 'dark-mode': darkMode }">
      <!-- Login Screen -->
      <LoginScreen
        v-if="!loggedIn"
        @login="checkLoginState"
      />

      <!-- Desktop -->
      <Desktop v-else :openApp="openApp" />
    </div>
  <!-- Taskbar -->
    <Taskbar
      v-if="loggedIn"
      :openApp="openApp"
      :commitSummary="commitSummary"
    />

    <!-- App Windows -->
  <!-- About me -->
    <AppWindow v-if="activeApp === 'aboutMe'" :title="$t('aboutMe')" @close="closeApp">
      <AboutMe :aboutMeVideoSrc="'/src/assets/videos/portfoliovideo.mov'" />
    </AppWindow>

  <!-- Contact -->
    <AppWindow v-if="activeApp === 'contact'" :title="$t('contact')" @close="closeApp">
      <Contact :contactForm="contactForm" />
    </AppWindow>

  <!-- Projects -->
    <AppWindow v-if="activeApp === 'projects'" :title="$t('projects')" @close="closeApp">
      <Projects :projects="projects" />
    </AppWindow>

  <!-- Socials -->
    <AppWindow v-if="activeApp === 'socials'" :title="$t('socials')" @close="closeApp">
      <Socials />
    </AppWindow>

  <!-- Artgallery -->
    <AppWindow v-if="activeApp === 'artGallery'" :title="$t('artGallery')" @close="closeApp">
      <ArtGallery :images="artGalleryImages" />
    </AppWindow>

  <!-- Mini Game -->
    <AppWindow v-if="activeApp === 'miniGame'" :title="$t('miniGame')" @close="closeApp">
      <MiniGame
        :clickerScore="clickerScore"
        :upgrades="upgrades"
        :pointsPerClick="pointsPerClick"
        @increment-score="incrementScore"
        @purchase-upgrade="purchaseUpgrade"
      />
    </AppWindow>

  <!-- Settings -->
    <AppWindow v-if="activeApp === 'settings'" :title="$t('settings')" @close="closeApp">
      <Settings
        v-model:darkMode="darkMode"
        v-model:currentLanguage="currentLanguage"
      />
    </AppWindow>

     <!-- 3D print support keuzedeel portfolio -->
    <AppWindow v-if="activeApp === 'threeDPrinting'" :title="$t('threeDPrinting')" @close="closeApp">
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
      currentLanguage: "en", // Default language
      currentDate: new Date().toLocaleDateString(),
      commitSummary: __COMMIT_SUMMARY__,
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