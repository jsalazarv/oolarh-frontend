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
    path: "/vacancies",
    name: "vacancies:list",
    component: () => import("@/views/vacancies/VacancyList.vue"),
    meta: { public: false },
  },
  {
    path: "/branch-offices",
    name: "branchOffices:list",
    component: () => import("@/views/branchOffices/BranchOfficesList.vue"),
    meta: { public: false },
  },
  {
    path: "/branch-offices/create",
    name: "branchOffices:create",
    component: () => import("@/views/branchOffices/BranchOfficesCreate.vue"),
    meta: { public: false },
  },
  {
    path: "/branch-offices/:id/edit",
    name: "branchOffices:edit",
    component: () => import("@/views/branchOffices/BranchOfficesEdit.vue"),
    meta: { public: false },
  },
  {
    path: "/branch-offices/:id/show",
    name: "branchOffices:show",
    component: () => import("@/views/branchOffices/BranchOfficesShow.vue"),
    meta: { public: false },
  },
  {
    path: "/departments",
    name: "departments:list",
    component: () => import("@/views/departments/DepartmentList.vue"),
    meta: { public: false },
  },
  {
    path: "/jobs",
    name: "jobs:list",
    component: () => import("@/views/jobs/JobList.vue"),
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
