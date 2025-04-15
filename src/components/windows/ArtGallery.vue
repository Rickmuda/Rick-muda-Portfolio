<template>
  <div class="art-gallery">
    <div class="gallery-grid">
      <div
        v-for="(image, index) in artGalleryImages"
        :key="index"
        class="gallery-item"
        @click="openImage(image)"
      >
        <img :src="image" alt="Art" class="gallery-image" />
      </div>
    </div>
    <div v-if="selectedImage" class="image-modal" @click="closeImage">
      <img :src="selectedImage" alt="Selected Art" class="modal-image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      artGalleryImages: [
        "/src/assets/img/imggallery/fnf.png",
        "/src/assets/img/imggallery/panels.jpg",
        "/src/assets/img/imggallery/pepe.png",
        "/src/assets/img/imggallery/room.jpg",
        "/src/assets/img/imggallery/vtuber.png",
        "/src/assets/img/imggallery/pose.png",
        "/src/assets/img/imggallery/dance.gif",
      ],
      selectedImage: null, // Track the selected image
    };
  },
  methods: {
    openImage(image) {
      this.selectedImage = image; // Open the modal with the selected image
    },
    closeImage() {
      this.selectedImage = null; // Close the modal
    },
  },
};
</script>
