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
    name: "NotFound",
    component: PageNotFound,
    // Make sure the component receives the path info
    props: (route) => ({
      type: "404",
      path: route.path,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(), // Remove the '/' parameter
  routes,
});

router.beforeEach((to, from, next) => {
  // If route doesn't exist, redirect to NotFound
  if (!to.matched.length) {
    next({
      name: "NotFound",
      params: { pathMatch: to.path.substring(1).split("/") },
      query: to.query,
      hash: to.hash,
    });
  } else {
    next();
  }
});

export default router;