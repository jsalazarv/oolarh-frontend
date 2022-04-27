import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { es, en } from "vuetify/src/locale";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        success: "#29B882",
        baseGrey: "#f5f7f9",
      },
    },
  },
  lang: {
    locales: {
      es,
      en,
    },
    current: "es",
  },
});
