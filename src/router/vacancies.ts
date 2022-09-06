import { VueModule } from "@/router/types";

export default [
  {
    path: "/vacancies",
    name: "vacancies:list",
    component: (): VueModule => import("@/views/vacancies/VacancyList.vue"),
    meta: { public: false },
  },
];
