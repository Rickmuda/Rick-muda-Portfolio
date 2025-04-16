<template>
  <div class="contact-window">
    <!-- Left Side: Contact Form -->
    <div class="contact-left">
      <form @submit.prevent="sendMessage" class="contact-form">
        <!-- Email Field -->
        <div class="form-group">
          <label for="email">{{ $t('email') }}</label>
          <input
            type="email"
            id="email"
            v-model="contactForm.email"
            :placeholder="$t('enterEmail')"
            required
          />
        </div>

        <!-- Full Name Field -->
        <div class="form-group">
          <label for="fullName">{{ $t('fullName') }}</label>
          <input
            type="text"
            id="fullName"
            v-model="contactForm.fullName"
            :placeholder="$t('enterFullName')"
            required
          />
        </div>

        <!-- Message Field -->
        <div class="form-group">
          <label for="message">{{ $t('message') }}</label>
          <textarea
            id="message"
            v-model="contactForm.message"
            :placeholder="$t('enterMessage')"
            rows="5"
            required
          ></textarea>
        </div>
      </form>
    </div>

    <!-- Right Side: Send Button -->
    <div class="contact-right">
      <button type="submit" class="send-button" @click="sendMessage">{{ $t('sendEmail') }}</button>
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
        alert(this.$t('fillAllFields'));
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
            alert(this.$t('messageSent'));
            // Clear the form
            this.contactForm.email = "";
            this.contactForm.fullName = "";
            this.contactForm.message = "";
          } else {
            alert(this.$t('messageFailed'));
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(this.$t('errorOccurred'));
        });
    },
  },
};
</script>