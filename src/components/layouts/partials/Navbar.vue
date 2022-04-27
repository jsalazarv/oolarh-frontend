<template>
  <v-app-bar app dense flat class="px-2" color="white" elevation="0">
    <v-spacer></v-spacer>
    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="primary" v-bind="attrs" v-on="on">
            <v-icon>mdi-earth</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(idiom, index) in languages"
            :key="index"
            @click="changeLocal(idiom.flag)"
          >
            <v-list-item-title :value="idiom.flag">
              {{ idiom.flag.toUpperCase() }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import i18n from "@/lang";

@Component({})
export default class Navbar extends Vue {
  public locale: string = i18n.locale;
  public languages = [
    {
      flag: "es",
      name: "Español",
    },
    {
      flag: "en",
      name: "Inglés",
    },
  ];

  changeLocal(lang: string): void {
    this.$store.dispatch("app/changeLanguage", lang);
  }
}
</script>

<style scoped></style>
