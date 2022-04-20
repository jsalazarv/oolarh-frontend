import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/loginOrRegister/LoginOrRegister.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/applications",
    name: "application:list",
    component: () => import("@/views/applications/ApplicationList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/applications/create",
    name: "application:create",
    component: () => import("@/views/applications/ApplicationCreate.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/employees",
    name: "employees:list",
    component: () => import("@/views/employees/EmployeeList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/departments",
    name: "departments:list",
    component: () => import("@/views/departments/DepartmentList.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    store.state.user === null
  ) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
