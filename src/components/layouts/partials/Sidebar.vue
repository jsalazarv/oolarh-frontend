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
          <v-img src="/isotype.svg" @click="mini = !mini"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>
          <v-img
            src="/logo-white.svg"
            width="100"
            @click="mini = !mini"
          ></v-img>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list>
      <template v-for="item in menu.children">
        <v-list-item
          v-if="item"
          :key="item.text"
          v-model="item.model"
          :to="{ name: item.route }"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-sm-caption">{{
              item.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IModuleMenu } from "@/store/app/types";

@Component({})
export default class Sidebar extends Vue {
  public mini = true;
  public drawer = true;

  get menu(): IModuleMenu {
    return this.$store.state.app.sidebar.menu;
  }
}
</script>

<style scoped></style>
