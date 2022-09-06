import { VueModule } from "@/router/types";

export default [
  {
    path: "/branch-offices",
    name: "branchOffices:list",
    component: (): VueModule =>
      import("@/views/branchOffices/BranchOfficesList.vue"),
    meta: { public: false },
  },
  {
    path: "/branch-offices/create",
    name: "branchOffices:create",
    component: (): VueModule =>
      import("@/views/branchOffices/BranchOfficesCreate.vue"),
    meta: { public: false },
  },
  {
    path: "/branch-offices/:id/edit",
    name: "branchOffices:edit",
    component: (): VueModule =>
      import("@/views/branchOffices/BranchOfficesEdit.vue"),
    meta: { public: false },
  },
  {
    path: "/branch-offices/:id/show",
    name: "branchOffices:show",
    component: (): VueModule =>
      import("@/views/branchOffices/BranchOfficesShow.vue"),
    meta: { public: false },
  },
];
