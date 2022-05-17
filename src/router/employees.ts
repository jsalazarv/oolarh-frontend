export default [
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
];