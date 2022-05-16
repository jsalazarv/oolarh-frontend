<template>
  <v-dialog v-model="isDialogOpen" max-width="450" transition="fab-transition">
    <v-card :loading="isLoading">
      <v-card-title class="subtitle-1 text-uppercase font-weight-regular">
        {{ $t("vacancies.labels.dialogs.show.title") }}
      </v-card-title>
      <v-card-actions>
        <div class="ml-2 my-4 text-subtitle-1">
          {{ data.name }}
        </div>
        <v-spacer></v-spacer>
        <v-chip class="ma-2" color="pink" label text-color="white">
          <v-icon left> mdi-cash </v-icon>
          {{ data.salary }}
        </v-chip>
      </v-card-actions>
      <v-card-text>
        <div class="text-justify">
          {{ data.description }}
        </div>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <small class="grey--text ms-4">
        {{ $t("vacancies.attributes.branch_office") }}:
        {{ data.branch_office.name }}
      </small>
      <v-spacer vertical></v-spacer>
      <v-card-actions></v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { IVacancy } from "@/services/VacancyService/types";

@Component
export default class ShowDialog extends Vue {
  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: Object, default: {} })
  data?: IVacancy;

  public isLoading = false;

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
</script>

<style scoped></style>
