export default [
  {
    path: "/jobs",
    name: "jobs:list",
    component: () => import("@/views/jobs/JobList.vue"),
    meta: { public: false },
  },
];
