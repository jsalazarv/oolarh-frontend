<template>
  <v-card class="pa-4" elevation="0">
    <v-card-actions>
      <div class="ml-2 my-4 text-subtitle-1 text-uppercase">
        {{ vacancy.name }}
      </div>
      <v-spacer></v-spacer>
      <v-chip class="ma-2" color="error" label text-color="white">
        <v-icon left> mdi-cash </v-icon>
        {{ vacancy.salary }}
      </v-chip>
    </v-card-actions>
    <v-card-text>
      <div class="text-justify">
        {{ vacancy.description }}
      </div>
    </v-card-text>
    <div>
      <v-divider class="mx-4"></v-divider>
      <small class="grey--text ms-4">
        {{ $t("vacancies.attributes.department") }}:
        {{ vacancy.department.name }}
      </small>
      <v-divider class="mx-4"></v-divider>
      <small class="grey--text ms-4">
        {{ $t("vacancies.attributes.branch_office") }}:
        {{ vacancy.branch_office.name }}
      </small>
      <v-divider class="mx-4"></v-divider>
    </div>
    <v-card-actions class="mt-6" v-if="selectable">
      <v-spacer class="mx-4"></v-spacer>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            small
            color="primary"
            class="mx-2"
            v-bind="attrs"
            v-on="on"
            :loading="loading"
            :disabled="disabled || loading"
            @click="onRecord"
          >
            <v-icon dark> mdi-target </v-icon>
          </v-btn>
        </template>
        <span>{{ $t("applications.labels.selectVacancy") }}</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import { IVacancy } from "@/services/VacancyService/types";

@Component
export default class VacancySelector extends Vue {
  @PropSync("data", { type: Object, default: {} })
  vacancy?: IVacancy;

  @PropSync("isDisabled", { type: Boolean, default: false })
  disabled!: false;

  @PropSync("isLoading", { type: Boolean, default: false })
  loading!: false;

  @PropSync("isItSelectable", { type: Boolean, default: true })
  selectable!: true;

  onRecord(): void {
    this.$emit("onRecord");
  }
}
</script>

<style scoped></style>
