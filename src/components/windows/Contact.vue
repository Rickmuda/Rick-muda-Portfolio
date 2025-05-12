<template>
  <div class="contact-window">
    <div class="socials-icons">
      <button class="social-icon" @click="openMail">
        <font-awesome-icon icon="envelope" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  methods: {
    openMail() {
      window.location.href = "mailto:rickmudaportfolio@gmail.com";
    }
  }
}
</script>