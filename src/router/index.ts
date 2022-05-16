import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import auth from "@/router/auth";
import dashboard from "@/router/dashboard";
import applications from "@/router/applications";
import employees from "@/router/employees";
import vacancies from "@/router/vacancies";
import branchOffices from "@/router/branchOffices";
import departments from "@/router/departments";
import jobs from "@/router/jobs";
import Authenticated from "./middleware/Authenticated";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...auth,
  ...dashboard,
  ...applications,
  ...employees,
  ...vacancies,
  ...branchOffices,
  ...departments,
  ...jobs,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const BeforeMiddleware = [Authenticated];
BeforeMiddleware.forEach((middleware) => router.beforeEach(middleware));

export default router;
