<template>
  <div class="settings">
    <label>
      <input type="checkbox" :checked="darkMode" @change="toggleDarkMode" />
      Enable Dark Mode
    </label>
  </div>
</template>

<script>
export default {
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleDarkMode() {
      this.$emit("update:darkMode", !this.darkMode); // Emit the updated value to App.vue
      this.updateBackgroundImage(!this.darkMode); // Update the background image
    },
    updateBackgroundImage(isDarkMode) {
      const backgroundElement = document.querySelector(".background");
      if (backgroundElement) {
        backgroundElement.style.backgroundImage = isDarkMode
          ? "url('/src/assets/img/imggallery/roomdark.png')"
          : "url('/src/assets/img/imggallery/room.jpg')";
      }
    },
  },
  mounted() {
    // Ensure the correct background image is set on initial load
    this.updateBackgroundImage(this.darkMode);
  },
};
</script>