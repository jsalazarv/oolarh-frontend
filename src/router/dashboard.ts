import { VueModule } from "@/router/types";

export default [
  {
    path: "/dashboard",
    name: "dashboard",
    component: (): VueModule => import("@/views/dashboard/Dashboard.vue"),
    meta: { public: false },
  },
];
