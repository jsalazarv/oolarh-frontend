import { VueModule } from "@/router/types";

export default [
  {
    path: "/jobs",
    name: "jobs:list",
    component: (): VueModule => import("@/views/jobs/JobList.vue"),
    meta: { public: false },
  },
];
