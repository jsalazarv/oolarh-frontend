import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Authenticated from "./middleware/Authenticated";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/loginOrRegister/LoginOrRegister.vue"),
    meta: { public: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard/Dashboard.vue"),
    meta: { public: false },
  },
  {
    path: "/applications",
    name: "application:list",
    component: () => import("@/views/applications/ApplicationList.vue"),
    meta: { public: false },
  },
  {
    path: "/applications/create",
    name: "application:create",
    component: () => import("@/views/applications/ApplicationCreate.vue"),
    meta: { public: false },
  },
  {
    path: "/employees",
    name: "employees:list",
    component: () => import("@/views/employees/EmployeeList.vue"),
    meta: { public: false },
  },
  {
    path: "/employees/create",
    name: "employees:create",
    component: () => import("@/views/employees/EmployeeCreate.vue"),
    meta: { public: false },
  },
  {
    path: "/departments",
    name: "departments:list",
    component: () => import("@/views/departments/DepartmentList.vue"),
    meta: { public: false },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const BeforeMiddleware = [Authenticated];
BeforeMiddleware.forEach((middleware) => router.beforeEach(middleware));

export default router;
