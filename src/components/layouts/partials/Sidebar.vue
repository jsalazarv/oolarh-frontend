<template>
  <v-navigation-drawer
    app
    color="#182F55"
    dark
    permanent
    width="200px"
    :value="drawer"
    :mini-variant="mini"
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="/logo.svg" @click="mini = !mini"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Sidebar extends Vue {
  public mini = false;
  public drawer = true;
}
</script>

<style scoped></style>
