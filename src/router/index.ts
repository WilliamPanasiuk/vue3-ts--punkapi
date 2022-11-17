import { createWebHistory, createRouter } from "vue-router";
import HomeView from "/src/views/HomeView.vue";
import BeerView from "/src/views/BeerView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/beer/:id",
    name: "BeerView",
    component: BeerView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
