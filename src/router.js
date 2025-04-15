import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import PageNotFound from "./components/PageNotFound.vue"; // Import the PageNotFound component

const routes = [
  {
    path: "/",
    name: "Home",
    component: App, // Replace with your home component if different
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route for invalid URLs
    name: "PageNotFound",
    component: PageNotFound, // Redirect to the PageNotFound component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;