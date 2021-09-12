import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import TodoDetail from "../views/TodoDetail.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/todos/:id",
    name: "todo-detail",
    component: TodoDetail,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes
});

export default router;
