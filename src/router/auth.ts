export default [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/loginOrRegister/LoginOrRegister.vue"),
    meta: { public: true },
  },
];
