export default [
  {
    path: "/vacancies",
    name: "vacancies:list",
    component: () => import("@/views/vacancies/VacancyList.vue"),
    meta: { public: false },
  },
];
