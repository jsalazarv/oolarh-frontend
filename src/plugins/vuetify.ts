import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { es, en } from "vuetify/src/locale";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: {
      es,
      en,
    },
    current: "es",
  },
});
