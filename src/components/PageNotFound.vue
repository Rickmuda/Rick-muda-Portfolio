<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-poster">
        <div class="poster-image">
          <img :src="errorImage" :alt="errorCode" />
        </div>
        <div class="poster-text">
          <h1>{{ errorCode }}</h1>
          <h2>{{ errorTitle }}</h2>
          <p>{{ errorMessage }}</p>
          <button class="error-button" @click="goHome">{{ buttonText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    type: {
      type: String,
      default: '404'
    }
  },
  data() {
    return {
      errorTypes: {
        '404': {
          code: '404',
          title: 'Page Not Found',
          message: "Oops! Looks like you've ventured into unknown territory.",
          image: new URL('@/assets/img/peterthinking.webp', import.meta.url).href,
          button: 'Return Home'
        },
        '500': {
          code: '500',
          title: 'Server Error',
          message: 'Something went wrong on our end. Please try again later.',
          image: new URL('@/assets/img/peterthinking.webp', import.meta.url).href,
          button: 'Try Again'
        },
        'default': {
          code: 'Error',
          title: 'Unexpected Error',
          message: 'An unexpected error occurred. Please try again.',
          image: new URL('@/assets/img/peterthinking.webp', import.meta.url).href,
          button: 'Go Back'
        }
      }
    }
  },
  computed: {
    errorCode() {
      return this.errorTypes[this.type]?.code || this.errorTypes.default.code
    },
    errorTitle() {
      return this.errorTypes[this.type]?.title || this.errorTypes.default.title
    },
    errorMessage() {
      return this.errorTypes[this.type]?.message || this.errorTypes.default.message
    },
    errorImage() {
      return this.errorTypes[this.type]?.image || this.errorTypes.default.image
    },
    buttonText() {
      return this.errorTypes[this.type]?.button || this.errorTypes.default.button
    }
  },
  methods: {
    goHome() {
      // Use router.replace instead of push to replace the error page in history
      this.$router.replace('/');
    }
  }
}
</script>

<style scoped>

</style>