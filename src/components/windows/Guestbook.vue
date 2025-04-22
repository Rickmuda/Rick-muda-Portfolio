<template>
  <div class="guestbook-container">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div class="guestbook-form">
      <input v-model="name" :placeholder="$t('guestbookName')" class="guestbook-input" />
      <textarea v-model="message" :placeholder="$t('guestbookMessage')" class="guestbook-textarea"></textarea>
      <button @click="submitEntry" class="guestbook-submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Submitting...' : $t('signGuestbook') }}
      </button>
    </div>
    <div class="guestbook-entries">
      <div v-if="isLoading" class="loading">Loading entries...</div>
      <div v-else-if="entries.length === 0" class="no-entries">No entries yet. Be the first to sign!</div>
      <div v-else v-for="entry in entries" :key="entry._id" class="guestbook-entry">
        <div class="entry-header">
          <strong>{{ entry.name }}</strong>
          <span class="entry-date">{{ new Date(entry.date).toLocaleDateString() }}</span>
        </div>
        <p>{{ entry.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default {
  name: 'Guestbook',
  data() {
    return {
      name: '',
      message: '',
      entries: [],
      error: null,
      isLoading: true,
      isSubmitting: false
    };
  },
  methods: {
    async fetchEntries() {
      this.error = null;
      this.isLoading = true;
      try {
        const response = await axios.get(`${API_URL}/guestbook`);
        this.entries = response.data;
      } catch (error) {
        console.error('Error fetching guestbook entries:', error);
        this.error = 'Unable to load guestbook entries. Please try again later.';
      } finally {
        this.isLoading = false;
      }
    },
    async submitEntry() {
      if (!this.name || !this.message) {
        this.error = 'Please fill in both name and message.';
        return;
      }
      
      this.error = null;
      this.isSubmitting = true;
      
      try {
        await axios.post(`${API_URL}/guestbook`, {
          name: this.name,
          message: this.message
        });
        this.name = '';
        this.message = '';
        await this.fetchEntries();
      } catch (error) {
        console.error('Error submitting entry:', error);
        this.error = 'Failed to submit your message. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    }
  },
  mounted() {
    this.fetchEntries();
  }
};
</script>

<style scoped>

</style>