import VueRouter from "vue-router";

const routes = [
  {
    path: "/create-order",
    name: "create-order",
    component: () => import("@/OrderForm.vue"),
  },
  {
    path: "/dash-board",
    name: "dash-board",
    component: () => import("@/DashBoard.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/App.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes, // short for `routes: routes`
});

export default router;
