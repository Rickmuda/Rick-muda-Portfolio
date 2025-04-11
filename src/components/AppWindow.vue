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
    overflow: hidden; /* Prevent scrollbars for the entire window */
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
    flex: 1; /* Take up the remaining space below the top bar */
    padding: 20px;
    color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    overflow-y: auto; /* Enable vertical scrolling */
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: #9b20b7 #f0f0f0; /* Thumb and track colors */
  }

  /* Custom Scrollbar for WebKit Browsers */
  .app-content::-webkit-scrollbar {
    width: 10px; /* Width of the scrollbar */
  }

  .app-content::-webkit-scrollbar-track {
    background: #f0f0f0; /* Track color */
    border-radius: 5px; /* Rounded corners for the track */
  }

  .app-content::-webkit-scrollbar-thumb {
    background: #9b20b7; /* Thumb color */
    border-radius: 5px; /* Rounded corners for the thumb */
    border: 2px solid #f0f0f0; /* Add padding around the thumb */
  }

  .app-content::-webkit-scrollbar-thumb:hover {
    background: #7a1793; /* Darker shade on hover */
  }
  
  .scrollable-app {
    overflow: auto; /* Allow scrollbars for the art gallery */
  }
  
  </style>