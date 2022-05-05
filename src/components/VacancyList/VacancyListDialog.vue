<template>
  <v-dialog v-model="isDialogOpen" transition="fab-transition" max-width="1200">
    <template>
      <v-card>
        <v-card-title>
          {{ $t("vacancies.list.title") }}
          <v-spacer></v-spacer>
          <div style="width: 300px">
            <v-text-field
              solo
              dense
              rounded
              clearable
              flat
              filled
              single-line
              hide-details
              outlined
              append-icon="mdi-magnify"
              :label="$t('vacancies.labels.search')"
              v-model="search"
            ></v-text-field>
          </div>
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
import VacancyService from "@/services/VacancyService";
import { IHeaders } from "@/services/types";
import { IVacancy } from "@/services/VacancyService/types";

@Component
export default class VacancyListDialog extends Vue {
  protected vacancyService = new VacancyService();
  public search = "";
  public vacancyList: Array<IVacancy> = [];
  @PropSync("open")
  public isDialogOpen!: boolean;

  get headers(): Array<IHeaders> {
    return [
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
        value: "salary",
        sortable: false,
      },
    ];
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  getVacancyList(): void {
    this.vacancyService
      .getAll()
      .then((response) => {
        this.vacancyList = response.data;
      })
      .catch()
      .finally();
  }

  mounted(): void {
    this.getVacancyList();
  }
}
</script>

<style scoped></style>
