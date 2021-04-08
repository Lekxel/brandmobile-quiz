import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Homepage",
    component: () => import("../views/homepage/index"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/test/index"),
  },
  {
    path: "/result",
    name: "Result",
    component: () => import("../views/result/index"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
