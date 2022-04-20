import { IModuleMenu } from "@/store/app/types";
import i18n from "@/lang";

const appMenu: IModuleMenu = {
  children: [
    {
      icon: "mdi-view-dashboard",
      text: i18n.t("sidebar.items.dashboard") as string,
      message: null,
      route: "dashboard",
    },
    {
      icon: "mdi-badge-account",
      text: i18n.t("sidebar.items.applications") as string,
      message: null,
      route: "application:list",
    },
    {
      icon: "mdi-account-group",
      text: i18n.t("sidebar.items.employees") as string,
      message: null,
      route: "employees:list",
    },
    {
      icon: "mdi-chair-rolling",
      text: i18n.t("sidebar.items.departments") as string,
      message: null,
      route: "departments:list",
    },
  ],
  defaultRoute: "dashboard",
};

export default appMenu;
