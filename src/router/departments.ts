import { VueModule } from "@/router/types";

export default [
  {
    path: "/departments",
    name: "departments:list",
    component: (): VueModule =>
      import("@/views/departments/DepartmentList.vue"),
    meta: { public: false },
  },
];
