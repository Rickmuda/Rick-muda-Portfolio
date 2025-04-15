<template>
  <div class="page-not-found">
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <button @click="goHome">Go Back to Home</button>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/"); // Navigate to the home page
    },
  },
};
</script>

<style scoped>

</style>