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
        {{ $t('goToProject') }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
      selectedProject: null, // Track the selected project
    };
  },
  methods: {
    selectProject(project) {
      this.selectedProject = this.selectedProject === project ? null : project;
    },
    initializeProjects() {
      this.projects = [
        {
          title: this.$t('uwp'),
          image: "../src/assets/img/projects/unnamed-weather-app.png",
          description: this.$t('uwpDescription'),
          link: "/404", // Link to the 404 page
        },
        {
          title: this.$t('aw'),
          image: "/src/assets/img/projects/irritante-webpagina.png",
          description: this.$t('awDescription'),
          link: "/404", // Link to the 404 page
        },
        {
          title: this.$t('wam'),
          image: "/src/assets/img/projects/whack-a-mom.png",
          description: this.$t('wamDescription'),
          link: "/404", // Link to the 404 page
        },
        {
          title: this.$t('gl'),
          image: "/src/assets/img/projects/gym-list.png",
          description: this.$t('glDescription'),
          link: "/404", // Link to the 404 page
        },
        {
          title: this.$t('op'),
          image: "/src/assets/img/projects/one-pager.png",
          description: this.$t('opDescription'),
          link: "/404", // Link to the 404 page
        },
      ];
    },
  },
  created() {
    this.initializeProjects(); // Initialize projects with translations
  },
};
</script>