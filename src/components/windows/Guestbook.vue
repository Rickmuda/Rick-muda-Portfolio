<template>
  <div class="guestbook-container">
    <div v-if="error || localError" class="error-message">
      {{ error || localError }}
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
  props: {
    entries: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    error: {
      type: String,
      default: null
    },
    onEntryAdded: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      name: '',
      message: '',
      localError: null,
      isSubmitting: false
    };
  },
  methods: {
    async submitEntry() {
      if (!this.name || !this.message) {
        this.localError = 'Please fill in both name and message.';
        return;
      }
      
      this.localError = null;
      this.isSubmitting = true;
      
      try {
        await axios.post(`${API_URL}/guestbook`, {
          name: this.name,
          message: this.message
        });
        this.name = '';
        this.message = '';
        await this.onEntryAdded(); // Call the parent's refresh method
      } catch (error) {
        console.error('Error submitting entry:', error);
        this.localError = 'Failed to submit your message. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>

</style>