<template>
  <v-dialog v-model="isDialogOpen" transition="fab-transition" max-width="1200">
    <template>
      <v-card>
        <v-card-title>
          {{ $t("vacancies.list.title") }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="$t('vacancies.labels.search')"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="vacancyList"
          :search="search"
        ></v-data-table>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import { IHeaders } from "@/services/types";

@Component
export default class VacancyListDialog extends Vue {
  @PropSync("open")
  public isDialogOpen!: boolean;

  public search = "";
  public vacancyList = [];

  get headers(): Array<IHeaders> {
    return [
      {
        text: this.$t("vacancies.attributes.id") as string,
        value: "id",
        sortable: false,
      },
      {
        text: this.$t("vacancies.attributes.name") as string,
        value: "name",
        sortable: false,
      },
      {
        text: this.$t("vacancies.attributes.description") as string,
        value: "description",
        sortable: false,
      },
      {
        text: this.$t("vacancies.attributes.department") as string,
        value: "department.name",
        sortable: false,
      },
      {
        text: this.$t("vacancies.attributes.branchOffice") as string,
        value: "branch_office.name",
        sortable: false,
      },
      {
        text: this.$t("vacancies.attributes.salary") as string,
        value: "description",
        sortable: false,
      },
    ];
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
</script>

<style scoped></style>
