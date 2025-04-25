<template>
  <div class="certificates-container">
    <div v-if="selectedIndex !== null" 
         class="certificate-modal" 
         @click.self="closeCertificate">
      <button class="certificate-arrow certificate-left-arrow" @click="prevSlide">&#9664;</button>
      <img 
        :src="certificates[selectedIndex].image" 
        :alt="certificates[selectedIndex].title"
        class="certificate-modal-image"
      />
      <button class="certificate-arrow certificate-right-arrow" @click="nextSlide">&#9654;</button>
      <button class="certificate-close-modal" @click="closeCertificate">
        <span>X</span>
      </button>
    </div>

    <div class="certificate-grid">
      <div
        v-for="(cert, index) in certificates"
        :key="index"
        class="certificate-item"
        @click="openCertificate(index)"
      >
        <img 
          :src="cert.image" 
          :alt="cert.title" 
          class="certificate-image"
        />
        <div class="certificate-text">
          <h3>{{ cert.title }}</h3>
          <p>{{ cert.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Certificates',
  data() {
    return {
      selectedIndex: null,
      certificates: [
        {
          title: "Rat Tickeling",
          description: "Certificate in how to tickle a rat.",
          image: new URL('@/assets/img/certificates/rattickling.webp', import.meta.url).href
        },
        {
          title: "The Church of Dudeism",
          description: "Certificate of ordination from the Church of Dudeism.",
          image: new URL('@/assets/img/certificates/dudeism.webp', import.meta.url).href
        },
      ]
    }
  },
  methods: {
    openCertificate(index) {
      this.selectedIndex = index;
    },
    closeCertificate() {
      this.selectedIndex = null;
    },
    nextSlide() {
      this.selectedIndex = (this.selectedIndex + 1) % this.certificates.length;
    },
    prevSlide() {
      this.selectedIndex = (this.selectedIndex - 1 + this.certificates.length) % this.certificates.length;
    }
  }
}
</script>