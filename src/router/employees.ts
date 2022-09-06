import { VueModule } from "@/router/types";

export default [
  {
    path: "/employees",
    name: "employees:list",
    component: (): VueModule => import("@/views/employees/EmployeeList.vue"),
    meta: { public: false },
  },
  {
    path: "/employees/create",
    name: "employees:create",
    component: (): VueModule => import("@/views/employees/EmployeeCreate.vue"),
    meta: { public: false },
  },
  {
    path: "/employees/:id/edit",
    name: "employees:edit",
    component: (): VueModule => import("@/views/employees/EmployeeEdit.vue"),
    meta: { public: false },
  },
  {
    path: "/employees/:id/show",
    name: "employees:show",
    component: (): VueModule => import("@/views/employees/EmployeeShow.vue"),
    meta: { public: false },
  },
];
