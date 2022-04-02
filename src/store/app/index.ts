import { IAppState } from "@/store/app/types";
import { Module } from "vuex";
import { IRootState } from "@/store/types";
import appMenu from "@/components/layouts/partials/menu";

const initialState: IAppState = {
  layout: "public-layout",
  sidebar: {
    menu: appMenu,
  },
};

const appStore: Module<IAppState, IRootState> = {
  namespaced: true,
  state: {
    ...initialState,
  },
  mutations: {
    SET_LAYOUT(state, layout: string) {
      state.layout = layout;
    },
  },
};

export default appStore;
