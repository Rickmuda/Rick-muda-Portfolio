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
      selectedProject: null,
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
          image: new URL('@/assets/img/projects/unnamed-weather-app.webp', import.meta.url).href,
          description: this.$t('uwpDescription'),
          link: "https://github.com/rickmuda/unnamed-weather-app"
        },
        {
          title: this.$t('aw'),
          image: new URL('@/assets/img/projects/irritante-webpagina.webp', import.meta.url).href,
          description: this.$t('awDescription'),
          link: "https://github.com/Rickmuda/Irritating-webpage"
        },
        {
          title: this.$t('wam'),
          image: new URL('@/assets/img/projects/whack-a-mom.webp', import.meta.url).href,
          description: this.$t('wamDescription'),
          link: "https://github.com/Rickmuda/WhackAMom-JS-game"
        },
        {
          title: this.$t('gl'),
          image: new URL('@/assets/img/projects/gym-list.webp', import.meta.url).href,
          description: this.$t('glDescription'),
          link: "https://github.com/Rickmuda/Gym-to-do-list"
        },
        {
          title: this.$t('op'),
          image: new URL('@/assets/img/projects/one-pager.webp', import.meta.url).href,
          description: this.$t('opDescription'),
          link: "https://github.com/Rickmuda/One-page-website"
        },
        {
          title: this.$t('eq'),
          image: new URL('@/assets/img/projects/english-quiz.webp', import.meta.url).href,
          description: this.$t('eqDescription'),
          link: "https://github.com/Rickmuda/English-quiz"
        },
        {
          title: this.$t('sp'),
          image: new URL('@/assets/img/projects/snackbar-podcast.webp', import.meta.url).href,
          description: this.$t('spDescription'),
          link: "https://www.youtube.com/watch?v=-JeNEwwF-Ms"
        },
        // {
        //   title: this.$t('tdl'),
        //   image: new URL('@/assets/img/projects/todolist.webp', import.meta.url).href,
        //   description: this.$t('tdlDescription'),
        //   link: "https://github.com/Rickmuda/To-do-list-API"
        // },
        {
          title: this.$t('us'),
          image: new URL('@/assets/img/projects/undertale-sudoku.webp', import.meta.url).href,
          description: this.$t('usDescription'),
          link: "https://github.com/Rickmuda/Undertale-sudoku"
        },
        {
          title: this.$t('lvt'),
          image: new URL('@/assets/img/projects/longvideotheater.webp', import.meta.url).href,
          description: this.$t('lvtDescription'),
          link: "https://github.com/Rickmuda/Longvideotheather2"
        },
        {
          title: this.$t('dnm'),
          image: new URL('@/assets/img/projects/dungeon and music.webp', import.meta.url).href,
          description: this.$t('dnmDescription'),
          link: "https://github.com/Rickmuda/Dungeons-and-music"
        },
        {
          title: this.$t('syp'),
          image: new URL('@/assets/img/projects/secondyearportfolio.webp', import.meta.url).href,
          description: this.$t('sypDescription'),
          link: "https://github.com/Rickmuda/Second-year-portfolio"
        },
        {
          title: this.$t('fyp'),
          image: new URL('@/assets/img/projects/firstyearportfolio.webp', import.meta.url).href,
          description: this.$t('fypDescription'),
          link: "https://github.com/Rickmuda/First-portfolio"
        },
      ];
    },
  },
  created() {
    this.initializeProjects();
  },
};
</script>