import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import PageNotFound from "./components/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: App,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory('/rick-muda-portfolio-vue.js/'), // Replace <repository-name> with your GitHub repo name
  routes,
});

export default router;