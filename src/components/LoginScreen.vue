<template>
  <div class="login-screen">
    <div class="center-box">
      <img src="/src/assets/img/pfp.png" alt="Profile Picture" class="center-image" />
    </div>
    <div class="password-box">
      <form @submit.prevent="checkPasswordLength">
        <input
          type="password"
          v-model="passwordInput"
          class="password-input"
          placeholder="Enter 6 random keys"
          readonly
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passwordInput: "", // Manage passwordInput locally
    };
  },
  methods: {
    simulateTyping() {
      const keys = ["a", "b", "c", "d", "e", "f"]; // Simulated keys
      let index = 0;

      const typingInterval = setInterval(() => {
        if (index < keys.length) {
          this.passwordInput += keys[index]; // Simulate typing
          index++;
        } else {
          clearInterval(typingInterval); // Stop typing
          this.checkLoginState(); // Automatically log in after typing
        }
      }, 100); // Simulate typing every 100ms
    },
    checkLoginState() {
      // Simulate a successful login
      this.$emit("login"); // Emit the login event to the parent component
    },
  },
  mounted() {
    this.simulateTyping(); // Start simulating typing when the component is mounted
  },
};
</script>