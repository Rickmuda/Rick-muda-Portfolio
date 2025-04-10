<template>
  <div id="app">
    <!-- Background Image -->
    <div class="background">
      <!-- Main Content -->
      <div class="content">
        <!-- Add your content here -->
      </div>
    </div>

    <!-- Footer Taskbar -->
    <footer class="taskbar">
      <div class="taskbar-item">Start</div>
      <div class="taskbar-item">Time: {{ currentTime }}</div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: new Date().toLocaleTimeString(),
    };
  },
  mounted() {
    // Update the time every second
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  },
};
</script>

<style scoped>
/* Fullscreen background */
.background {
  background-image: url('path-to-your-background-image.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Footer Taskbar */
.taskbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
}

.taskbar-item {
  padding: 0 10px;
}
</style>