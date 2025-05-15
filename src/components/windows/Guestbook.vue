<template>
  <div class="guestbook-container">
    <!-- Info Message -->
    <div class="info-message">
      <p>{{ $t('guestbookInfo') || 'Welcome to my guestbook! Leave a message for future visitors.' }}</p>
    </div>

    <!-- Guestbook Form -->
    <div class="guestbook-form">
      <input 
        v-model="name" 
        :placeholder="$t('guestbookName') || 'Your Name'" 
        class="guestbook-input" 
      />
      <textarea 
        v-model="message" 
        :placeholder="$t('guestbookMessage') || 'Your Message'" 
        class="guestbook-textarea"
      ></textarea>
      <button 
        @click="submitEntry" 
        class="guestbook-submit" 
        :disabled="isSubmitting || !name || !message"
      >
        {{ isSubmitting ? 'Submitting...' : $t('guestbookSubmit') || 'Submit' }}
      </button>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccess" class="success-message">
      {{ $t('guestbookSuccess') || 'Thank you for signing the guestbook!' }}
    </div>

    <!-- Guestbook Entries -->
    <div class="guestbook-entries">
      <div v-if="entries.length === 0" class="no-entries">
        {{ $t('noEntries') || 'No entries yet. Be the first to sign!' }}
      </div>
      <div v-for="(entry, index) in entries" :key="index" class="guestbook-entry">
        <div class="entry-header">
          <strong>{{ entry.name }}</strong>
          <span class="entry-date">{{ formatDate(entry.date) }}</span>
        </div>
        <p>{{ entry.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guestbook',
  data() {
    return {
      name: '',
      message: '',
      isSubmitting: false,
      entries: [],
      showSuccess: false
    };
  },
  methods: {
    submitEntry() {
      // Validate input
      if (!this.name || !this.message) {
        return;
      }

      this.isSubmitting = true;

      // Create new entry
      const newEntry = {
        name: this.name,
        message: this.message,
        date: new Date().toISOString()
      };

      // Add to entries
      this.entries.unshift(newEntry);  // Add to beginning of array
      
      // Save to localStorage
      this.saveEntries();

      // Clear form
      this.name = '';
      this.message = '';
      this.isSubmitting = false;
      
      // Show success message
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    saveEntries() {
      localStorage.setItem('guestbookEntries', JSON.stringify(this.entries));
    },
    
    loadEntries() {
      const saved = localStorage.getItem('guestbookEntries');
      this.entries = saved ? JSON.parse(saved) : [];
    }
  },
  mounted() {
    // Load entries from localStorage
    this.loadEntries();
  }
};
</script>