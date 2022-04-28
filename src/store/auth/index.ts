import { Module } from "vuex";
import { IAuthState } from "@/store/auth/types";
import { IRootState } from "@/store/types";

const authState: Module<IAuthState, IRootState> = {
  namespaced: true,
  state: {
    access: {
      access_token: null,
      token_type: null,
    },
  },
  mutations: {
    SET_CREDENTIALS(state, credentials) {
      state.access = credentials;
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
  },
};

export default authState;
