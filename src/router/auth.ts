import { VueModule } from "@/router/types";

export default [
  {
    path: "/",
    name: "login",
    component: (): VueModule =>
      import("@/views/loginOrRegister/LoginOrRegister.vue"),
    meta: { public: true },
  },
];
