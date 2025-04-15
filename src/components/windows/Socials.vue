<template>
  <div class="socials-window">
    <div class="socials-icons">
      <a href="https://twitter.com/Rick_rickerd" target="_blank" class="social-icon">
        <font-awesome-icon :icon="['fab', 'twitter']" />
      </a>
      <a href="https://www.instagram.com/rick_muda/" target="_blank" class="social-icon">
        <font-awesome-icon :icon="['fab', 'instagram']" />
      </a>
      <a href="https://www.linkedin.com/in/rick-ambergen-30b73a29a/" target="_blank" class="social-icon">
        <font-awesome-icon :icon="['fab', 'linkedin']" />
      </a>
      <a href="https://github.com/MudaIsCarry" target="_blank" class="social-icon">
        <font-awesome-icon :icon="['fab', 'github']" />
      </a>
      <a href="https://www.youtube.com/channel/UCHSimkVEkXs0Xp1U4nInA0w" target="_blank" class="social-icon">
        <font-awesome-icon :icon="['fab', 'youtube']" />
      </a>
      <a href="https://www.tiktok.com/@rick_muda" target="_blank" class="social-icon">
        <font-awesome-icon :icon="['fab', 'tiktok']" />
      </a>
      <a href="https://open.spotify.com/user/rick_rickerd_rickman" target="_blank" class="social-icon">
        <font-awesome-icon :icon="['fab', 'spotify']" />
      </a>
      <a href="https://steamcommunity.com/id/Mudaiscarry/" target="_blank" class="social-icon">
        <font-awesome-icon :icon="['fab', 'steam']" />
      </a>
      <a href="https://codepen.io/mudaiscarry" target="_blank" class="social-icon">
        <font-awesome-icon :icon="['fab', 'codepen']" />
      </a>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon,
  },
};
</script>