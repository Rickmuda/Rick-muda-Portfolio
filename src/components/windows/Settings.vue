<template>
  <div class="settings">
    <!-- Dark Mode Toggle -->
    <label class="dark-mode-toggle">
      <span class="label-text">{{ $t('enableDarkMode') }}</span>
      <input type="checkbox" :checked="darkMode" @change="toggleDarkMode" />
      <span class="slider"></span>
    </label>

    <!-- Language Selection -->
    <div class="language-selection">
      <label for="language-select" class="label-text">{{ $t('selectLanguage') }}</label>
      <select id="language-select" v-model="selectedLanguage" @change="changeLanguage">
        <option value="en">{{ $t('english') }}</option>
        <option value="nl">{{ $t('dutch') }}</option>
        <!-- <option value="de">{{ $t('german') }}</option> -->
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
    currentLanguage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedLanguage: this.currentLanguage, // Initialize with the current language
    };
  },
  methods: {
    toggleDarkMode() {
      this.$emit("update:darkMode", !this.darkMode); // Emit the updated value to App.vue
    },
    changeLanguage() {
      this.$emit("update:currentLanguage", this.selectedLanguage); // Emit the selected language to App.vue
      this.$i18n.locale = this.selectedLanguage; // Update the locale dynamically
    },
  },
};
</script>