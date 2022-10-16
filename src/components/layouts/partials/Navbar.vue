<template>
  <v-app-bar app dense flat color="white" elevation="0">
    <v-spacer></v-spacer>
    <div class="text-right">
      <AuthUserInfo />
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LanguageSelector from "@/components/LanguageSelector/LanguageSelector.vue";
import AuthUserInfo from "@/components/AuthUserInfo/AuthUserInfo.vue";

@Component({
  components: { AuthUserInfo, LanguageSelector },
})
export default class Navbar extends Vue {}
</script>

<style scoped></style>
