<template>
  <div class="about-me-container">
    <!-- Speaker Images -->
    <div class="speaker-images">
      <img
        v-if="currentSpeaker === 'me'"
        src="/src/assets/img/self-image-1.webp"
        alt="Me"
        class="speaker-image"
      />
      <img
        v-if="currentSpeaker === 'me2'"
        src="/src/assets/img/self-image-2.webp"
        alt="Me (Alternate)"
        class="speaker-image"
      />
    </div>

    <!-- Dialogue Text -->
    <div class="dialogue-box">
      <p>{{ displayedText }}</p>
    </div>

    <!-- Dialogue Options -->
    <div class="choices" v-show="currentChoices.length">
      <button
        v-for="(choice, index) in currentChoices"
        :key="index"
        @click="makeChoice(choice)"
        class="choice-button"
      >
        {{ choice.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      story: {
        start: {
          text: [
            { speaker: "me", text: "Hey there! Welcome to my portfolio." },
            { speaker: "me2", text: "What brings you here today?" },
          ],
          choices: [
            { text: "Tell me about yourself.", next: "aboutMe" },
            { text: "Show me your projects.", next: "projects" },
            { text: "What are your skills?", next: "skills" },
          ],
        },
        aboutMe: {
          text: [
            { 
              speaker: "me", text: "Sure! I'm what a lot of people would say a nerd." 
            },
            { 
              speaker: "me", text: "I love gadgets and gizmos." 
            },
            { 
              speaker: "me", text: "I also love listening to vinyls and playing video games." 
            },
            { 
              speaker: "me", text: "My favorite vinyl I own has to be the original soundtrack of the movie 'Spiderman into the spider-verse'." 
            },
            { 
              speaker: "me", text: "And I actually do not have one favorite game, I have two." 
            },
            { 
              speaker: "me", text: "Bloodborne and The binding of isaac have a special place in my heart." 
            },
            {
              speaker: "me",
              text: "What else can I help you with?",
            }
          ],
          choices: [
            { text: "What are your skills?", next: "skills" },
            { text: "Show me your projects.", next: "projects" },
            { text: "Go back.", next: "start" },
          ],
        },
        projects: {
          text: [
            { speaker: "me", text: "The projects I make in my freetime are mostly ideas I randomly get." },
            {
              speaker: "me2",
              text: "If you are currious about my projects, you can check out a couple on the projects window or on my github.",
            },
            {
              speaker: "me",
              text: "What else can I help you with?",
            },
          ],
          choices: [
            { text: "Tell me about yourself.", next: "aboutMe" },
            { text: "What are your skills?", next: "skills" },
            { text: "Go back.", next: "start" },
          ],
        },
        skills: {
          text: [
            { speaker: "me", text: "I specialize in front-end web development." },
            {
              speaker: "me2",
              text: "I work with all kinds of front-end languages and frameworks.",
            },
            {
              speaker: "me",
              text: "I also have experience with back-end technologies, but I prefer working with front-end so I can let my creativity shine.",
            },
            {
              speaker: "me",
              text: "What else can I help you with?",
            }
          ],
          choices: [
            { text: "Tell me about yourself.", next: "aboutMe" },
            { text: "Show me your projects.", next: "projects" },
            { text: "Go back.", next: "start" },
          ],
        },
      },
      currentNode: "start",
      currentDialogue: "",
      currentSpeaker: "me",
      currentChoices: [],
      dialogueIndex: 0,
      displayedText: "",
      isTyping: false,
      typingSpeed: 40, // Speed of typing effect in milliseconds
      imageToggleInterval: null, // Interval for toggling images
    };
  },
  methods: {
    makeChoice(choice) {
      this.currentNode = choice.next;
      this.dialogueIndex = 0;
      this.currentChoices = []; // Clear choices when a new node is selected
      this.updateDialogue();
    },
    updateDialogue() {
      const node = this.story[this.currentNode];
      if (this.dialogueIndex < node.text.length) {
        const line = node.text[this.dialogueIndex];
        this.currentDialogue = line.text;
        this.dialogueIndex++;
        this.typeText(line.text);
      } else {
        // Update choices when dialogue is finished
        this.currentChoices = node.choices || [];
      }
    },
    typeText(text) {
      this.displayedText = "";
      this.isTyping = true;
      let charIndex = 0;

      // Start toggling images
      this.startImageToggle();

      const typingInterval = setInterval(() => {
        if (charIndex < text.length) {
          this.displayedText += text[charIndex];
          charIndex++;
        } else {
          clearInterval(typingInterval);
          this.isTyping = false; // Ensure this is set to false
          this.stopImageToggle();

          // Wait for 2 seconds before proceeding to the next dialogue or showing choices
          setTimeout(() => {
            if (this.dialogueIndex < this.story[this.currentNode].text.length) {
              this.updateDialogue();
            } else {
              // Ensure choices are updated after typing finishes
              this.currentChoices = this.story[this.currentNode].choices || [];
            }
          }, 500); // 2-second delay
        }
      }, this.typingSpeed);
    },
    startImageToggle() {
      this.imageToggleInterval = setInterval(() => {
        this.currentSpeaker = this.currentSpeaker === "me" ? "me2" : "me";
      }, 100); // Toggle every 200ms
    },
    stopImageToggle() {
      clearInterval(this.imageToggleInterval);
      this.imageToggleInterval = null;
      this.currentSpeaker = "me"; // Ensure the image is always self-image-1 after typing
    },
  },
  mounted() {
    this.updateDialogue();
  },
};
</script>