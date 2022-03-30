import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { IUserStore } from "@/store/user/types";

const userStore: Module<IUserStore, IRootState> = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
    },
    CLEAR_USER_DATA(state) {
      state.user = null;
    },
  },
  actions: {
    login({ commit }, credentials) {
      commit("SET_USER_DATA", credentials);
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
  },
};

export default userStore;
