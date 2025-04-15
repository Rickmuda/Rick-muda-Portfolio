<template>
  <div class="projects-window">
    <!-- Projects Grid -->
    <div
      class="projects-grid"
      :class="{ 'grid-expanded': selectedProject }"
    >
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="project-card"
        :class="{ selected: selectedProject === project }"
        @click="selectProject(project)"
      >
        <img :src="project.image" alt="Project Image" />
        <p>{{ project.title }}</p>
      </div>
    </div>

    <!-- Project Details -->
    <div v-if="selectedProject" class="project-details">
      <img :src="selectedProject.image" alt="Selected Project Image" />
      <h3>{{ selectedProject.title }}</h3>
      <p>{{ selectedProject.description }}</p>
      <a
        :href="selectedProject.link"
        target="_blank"
        class="project-link"
      >
        Go to Project
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          title: "Unnamed weather app",
          image: "../src/assets/img/projects/unnamed-weather-app.png",
          description: "A small project I had to do for school where we had to make use of an API.",
          link: "/404", // Link to the 404 page
        },
        {
          title: "Annoying webpage",
          image: "/src/assets/img/projects/irritante-webpagina.png",
          description: "This was the second project of my first year where I had to work in pairs and make a webpage as annoying as possible.",
          link: "/404", // Link to the 404 page
        },
        {
          title: "Whack A Mom",
          image: "/src/assets/img/projects/whack-a-mom.png",
          description: "For the third project of my first year I had to make a game using HTML, CSS and JS.",
          link: "/404", // Link to the 404 page
        },
        {
          title: "Gym list",
          image: "/src/assets/img/projects/gym-list.png",
          description: "This project I made was for myself to keep track of my gym progress.",
          link: "/404", // Link to the 404 page
        },
        {
          title: "One page website",
          image: "/src/assets/img/projects/one-pager.png",
          description: "For the first of my first year I had to recreate a one-page website using HTML and CSS.",
          link: "/404", // Link to the 404 page
        },
      ],
      selectedProject: null, // Track the selected project
    };
  },
  methods: {
    selectProject(project) {
      this.selectedProject = this.selectedProject === project ? null : project;
    },
  },
};
</script>