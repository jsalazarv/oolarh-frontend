<template>
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
        <v-img :src="idiom.img" width="20" class="mr-5" />
        <v-list-item-title :value="idiom.flag">
          {{ idiom.flag.toUpperCase() }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ILanguage } from "@/services/types";

@Component
export default class LanguageSelector extends Vue {
  @Prop({
    type: Array,
    default: () => [
      {
        flag: "es",
        name: "Español",
        img: "/mexico.png",
      },
      {
        flag: "en",
        name: "Inglés",
        img: "/united-states.png",
      },
    ],
  })
  public languages?: Array<ILanguage>;

  changeLocal(lang: string): void {
    this.$store.dispatch("app/changeLanguage", lang);
  }
}
</script>

<style scoped></style>
