<template>
  <vue3-draggable-resizable
    :x="defaultX"
    :y="defaultY"
    :w="defaultWidth"
    :h="defaultHeight"
    :resizable="false"
    :active="true"
    :parent="true" 
    class="draggable-window"
    :style="{ zIndex: zIndex }"
    @mousedown="bringToFront"
  >
    <div class="app-window">
      <div class="top-bar">
        <span class="window-title">{{ title }}</span>
        <div class="close-button" @click="closeWindow">
          <span>X</span>
        </div>
      </div>
      <div class="app-content">
        <slot></slot>
      </div>
    </div>
  </vue3-draggable-resizable>
</template>

<script>
import Vue3DraggableResizable from "vue3-draggable-resizable";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    defaultWidth: {
      type: Number,
      required: true,
    },
    defaultHeight: {
      type: Number,
      required: true,
    },
    defaultX: {
      type: Number,
      default: 100,
    },
    defaultY: {
      type: Number,
      default: 100,
    },
    zIndex: {
      type: Number,
      required: true, // Pass the z-index from App.vue
    },
  },
  components: {
    Vue3DraggableResizable,
  },
  methods: {
    closeWindow() {
      this.$emit("close");
    },
    bringToFront() {
      this.$emit("bringToFront"); // Emit an event to bring the window to the front
    },
  },
};
</script>

<style scoped>
.draggable-window {
  z-index: 10;
}

.app-window {
  width: 100%;
  height: 100%;
  background: rgba(155, 32, 183, 1);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 3px solid black;
}

.top-bar {
  height: 56px;
  background: rgba(217, 217, 217, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 3px solid black;
}

.window-title {
  font-size: 18px;
  font-weight: bold;
}

.close-button {
  width: 40px;
  height: 40px;
  background: rgba(255, 0, 0, 1);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.app-content {
  flex: 1;
  overflow: auto;
  padding: 20px;
}
</style>