<template>
  <div class="contact-window">
    <!-- Left Side: Contact Form -->
    <div class="contact-left">
      <form @submit.prevent="sendMessage" class="contact-form">
        <!-- Email Field -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="contactForm.email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Full Name Field -->
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            v-model="contactForm.fullName"
            placeholder="Enter your full name"
            required
          />
        </div>

        <!-- Message Field -->
        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="contactForm.message"
            placeholder="Enter your message"
            rows="5"
            required
          ></textarea>
        </div>
      </form>
    </div>

    <!-- Right Side: Send Button -->
    <div class="contact-right">
      <button type="submit" class="send-button" @click="sendMessage">Send e-mail</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contactForm: {
        email: "",
        fullName: "",
        message: "",
      },
    };
  },
  methods: {
    sendMessage() {
      const { email, fullName, message } = this.contactForm;

      // Validate the form fields
      if (!email || !fullName || !message) {
        alert("Please fill out all fields.");
        return;
      }

      // Send the form data to the backend
      fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName, message }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Message sent successfully!");
            // Clear the form
            this.contactForm.email = "";
            this.contactForm.fullName = "";
            this.contactForm.message = "";
          } else {
            alert("Failed to send message. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
    },
  },
};
</script>