export default [
  {
    path: "/applications",
    name: "application:list",
    component: () => import("@/views/applications/ApplicationList.vue"),
    meta: { public: false },
  },
  {
    path: "/applications/create",
    name: "application:create",
    component: () => import("@/views/applications/ApplicationCreate.vue"),
    meta: { public: false },
  },
];
