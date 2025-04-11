<template>
    <div class="app-window">
      <div class="top-bar">
        <span class="v3_198">{{ title }}</span>
        <div class="close-button" @click="closeWindow">
          <span class="v3_197">X</span>
        </div>
      </div>
      <div class="app-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    methods: {
      closeWindow() {
        this.$emit("close");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Main App Window */
  .app-window {
    width: 90%;
    height: 75%;
    background: rgba(155, 32, 183, 1);
    border-radius: 15px;
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: #000 solid 1px;
  }
  
  /* Top Bar */
  .top-bar {
    width: 100%;
    height: 56px;
    background: rgba(217, 217, 217, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border: #000 solid 2px;
  }
  
  /* Title Text */
  .v3_198 {
    font-size: 24px;
    color: white;
    text-align: left;
    margin-left: 0;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    font-family: "Retro Gaming", sans-serif;
  }
  
  /* Close Button */
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
  
  /* Close Button Text */
  .v3_197 {
    font-family: "Retro Gaming", sans-serif;
    font-size: 24px;
    color: black;
    text-align: center;
  }
  
  /* App Content */
  .app-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }
  </style>