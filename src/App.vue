<template>
  <v-app id="app" style="background-color: #f5f7f9">
    <component :is="layout"></component>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppLayout from "@/components/layouts/AppLayout.vue";
import PublicLayout from "@/components/layouts/PublicLayout.vue";
import i18n from "@/lang";

@Component({
  components: {
    PublicLayout,
    AppLayout,
  },
})
export default class App extends Vue {
  get layout(): string {
    return this.$store.state.app.layout;
  }

  mounted(): void {
    i18n.locale = this.$store.state.app.lang;
  }
}
</script>
