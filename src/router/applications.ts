import { VueModule } from "@/router/types";

export default [
  {
    path: "/applications",
    name: "application:list",
    component: (): VueModule =>
      import("@/views/applications/ApplicationList.vue"),
    meta: { public: false },
  },
  {
    path: "/applications/create",
    name: "application:create",
    component: (): VueModule =>
      import("@/views/applications/ApplicationCreate.vue"),
    meta: { public: false },
  },
  {
    path: "/applications/:id/edit",
    name: "application:edit",
    component: (): VueModule =>
      import("@/views/applications/ApplicationEdit.vue"),
    meta: { public: false },
  },
];
