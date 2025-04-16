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
  history: createWebHistory(),
  routes,
});

export default router;