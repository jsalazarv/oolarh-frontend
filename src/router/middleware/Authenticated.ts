import store from "@/store";
import { NavigationGuardNext, Route } from "vue-router";

const Authenticated = async (
  to: Route,
  from: Route,
  next: NavigationGuardNext
): Promise<unknown> => {
  if (to.meta?.public === true) {
    return next();
  }
  if (to.name === "login" && store.getters["auth/authenticated"]) {
    return next({ name: "dashboard" });
  }
  if (to.name !== "login" && !store.getters["auth/authenticated"]) {
    return next({ name: "login" });
  }
  if (!to.name) {
    return next({ name: "dashboard" });
  }
  return next();
};

export default Authenticated;
