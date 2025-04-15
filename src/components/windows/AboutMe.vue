<template>
  <div class="about-me">
    <div class="video-container">
      <video
        ref="aboutMeVideo"
        class="about-me-video"
        :src="aboutMeVideoSrc"
        @timeupdate="updateVideoTime"
        @ended="handleVideoEnd"
      ></video>
    </div>
    <div class="video-controls">
      <button @click="togglePlayPause">{{ isPlaying ? 'Pause' : 'Play' }}</button>
      <input type="range" min="0" :max="videoDuration" step="0.1" v-model="videoCurrentTime" @input="seekVideo" />
      <input type="range" min="0" max="1" step="0.1" v-model="volume" @input="adjustVolume" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    aboutMeVideoSrc: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isPlaying: false,
      videoDuration: 0,
      videoCurrentTime: 0,
      volume: 1,
    };
  },
  methods: {
    togglePlayPause() {
      const video = this.$refs.aboutMeVideo;
      if (video.paused) {
        video.play();
        this.isPlaying = true;
      } else {
        video.pause();
        this.isPlaying = false;
      }
    },
    updateVideoTime() {
      const video = this.$refs.aboutMeVideo;
      this.videoCurrentTime = video.currentTime;
      this.videoDuration = video.duration;
    },
    seekVideo() {
      const video = this.$refs.aboutMeVideo;
      video.currentTime = this.videoCurrentTime;
    },
    adjustVolume() {
      const video = this.$refs.aboutMeVideo;
      video.volume = this.volume;
    },
    handleVideoEnd() {
      const video = this.$refs.aboutMeVideo;
      video.pause();
      this.isPlaying = false;
    },
  },
};
</script>
