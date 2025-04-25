<template>
  <AppWindow
    :title="$t('underDevelopment')"
    :defaultWidth="400"
    :defaultHeight="400"
    :defaultX="window.innerWidth / 2 - 200"
    :defaultY="window.innerHeight / 2 - 100"
    :zIndex="1000"
    @close="$emit('close')"
  >
    <div class="under-development-content">
      <h2>{{ $t('underDevelopment') }}</h2>
      <p>{{ $t('underDevelopmentMessage') }}</p>
    </div>
  </AppWindow>
</template>

<script>
import AppWindow from './AppWindow.vue'

export default {
  name: 'UnderDevelopment',
  components: {
    AppWindow
  },
  data() {
    return {
      window: window
    }
  }
}
</script>