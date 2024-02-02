import { createRouter, createWebHistory } from "vue-router";
import StartBildschirm from "../views/StartBildschirm.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: StartBildschirm,
  },
  {
    path: "/course",
    name: "course",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "course" */ "../views/AuswahlCourse.vue"),
  },
  {
    path: "/nav",
    name: "nav",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "nav" */ "../views/NavigationScreen.vue"),
  },
  {
    path: "/spieler",
    name: "spieler",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "spieler" */ "../views/SpielerWahl.vue"),
  },
  {
    path: "/scores",
    name: "scores",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "scores" */ "../views/SpielStand.vue"),
  },
  {
    path: "/ansicht",
    name: "ansicht",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "ansicht" */ "../views/GesamtAnsicht.vue"),
  },
  {
    path: "/regeln",
    name: "regeln",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "ansicht" */ "../views/SpielRegeln.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
