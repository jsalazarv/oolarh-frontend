import { Module } from "vuex";
import { IAuthState } from "@/store/auth/types";
import { IRootState } from "@/store/types";

const initialAccess = {
  access_token: null,
  token_type: null,
};

const authState: Module<IAuthState, IRootState> = {
  namespaced: true,
  state: {
    access: { ...initialAccess },
  },
  mutations: {
    SET_CREDENTIALS(state, credentials) {
      state.access = { ...credentials };
    },
    RESET_ACCESS(state) {
      state.access = { ...initialAccess };
    },
  },
  getters: {
    authenticated: (state) => {
      return !!state.access.access_token;
    },
  },
  actions: {
    authenticate({ commit }, credentials) {
      commit("SET_CREDENTIALS", credentials);
    },
    resetAccess({ commit }) {
      commit("RESET_ACCESS");
    },
  },
};

export default authState;
