<template>
  <div class="desktop">
    <!-- About Me -->
    <div class="app-icon" @click="openApp('aboutMe')">
      <div class="app-icon-image">
        <font-awesome-icon icon="user" class="app-icon-inner" />
      </div>
      <div class="app-icon-text">{{ $t('aboutMe') }}</div>
    </div>

    <!-- Projects -->
    <div class="app-icon" @click="openApp('projects')">
      <div class="app-icon-image">
        <font-awesome-icon icon="folder" class="app-icon-inner" />
      </div>
      <div class="app-icon-text">{{ $t('projects') }}</div>
    </div>

    <!-- Contact -->
    <div class="app-icon" @click="openApp('contact')">
      <div class="app-icon-image">
        <font-awesome-icon icon="envelope" class="app-icon-inner" />
      </div>
      <div class="app-icon-text">{{ $t('contact') }}</div>
    </div>

    <!-- Socials -->
    <div class="app-icon" @click="openApp('socials')">
      <div class="app-icon-image">
        <font-awesome-icon icon="share-nodes" class="app-icon-inner" />
      </div>
      <div class="app-icon-text">{{ $t('socials') }}</div>
    </div>

    <!-- Mini Game -->
    <div class="app-icon" @click="openApp('miniGame')">
      <div class="app-icon-image">
        <font-awesome-icon icon="gamepad" class="app-icon-inner" />
      </div>
      <div class="app-icon-text">{{ $t('miniGame') }}</div>
    </div>

    <!-- Art Gallery -->
    <div class="app-icon" @click="openApp('artGallery')">
      <div class="app-icon-image">
        <font-awesome-icon icon="palette" class="app-icon-inner" />
      </div>
      <div class="app-icon-text">{{ $t('artGallery') }}</div>
    </div>

    <!-- Settings -->
    <div class="app-icon" @click="openApp('settings')">
      <div class="app-icon-image">
        <font-awesome-icon icon="cog" class="app-icon-inner" />
      </div>
      <div class="app-icon-text">{{ $t('settings') }}</div>
    </div>

    <!-- 3D Printing -->
    <!-- <div class="app-icon" @click="openApp('threeDPrinting')">
      <div class="app-icon-image">
        <font-awesome-icon icon="cube" class="app-icon-inner" />
      </div>
      <div class="app-icon-text">{{ $t('threeDPrinting') }}</div>
    </div> -->
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  props: {
    openApp: {
      type: Function,
      required: true,
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>