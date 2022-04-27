<template>
  <v-app-bar app dense flat class="px-2" color="white" elevation="0">
    <v-spacer></v-spacer>
    <div class="text-center">
      <LanguageSelector />
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LanguageSelector from "@/components/LanguageSelector/LanguageSelector.vue";

@Component({
  components: { LanguageSelector },
})
export default class Navbar extends Vue {}
</script>

<style scoped></style>
