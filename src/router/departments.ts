export default [
  {
    path: "/departments",
    name: "departments:list",
    component: () => import("@/views/departments/DepartmentList.vue"),
    meta: { public: false },
  },
];
