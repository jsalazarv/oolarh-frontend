import { IAppState } from "@/store/app/types";
import { Module } from "vuex";
import { IRootState } from "@/store/types";
import appMenu from "@/components/layouts/partials/menu";
import i18n from "@/lang";

const initialState: IAppState = {
  layout: "public-layout",
  lang: i18n.locale,
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

    SET_LANGUAGE(state, lang) {
      i18n.locale = state.lang = lang;
    },
  },
  actions: {
    changeLanguage({ commit }, lang) {
      commit("SET_LANGUAGE", lang);
    },
  },
};

export default appStore;
