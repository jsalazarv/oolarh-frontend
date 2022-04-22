<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card class="pa-4" elevation="0">
      <v-toolbar flat>
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("employees.create.title") }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text></v-card-text>
      <v-card-actions class="justify-end"> </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EmployeeCreate extends Vue {}
</script>

<style scoped></style>
