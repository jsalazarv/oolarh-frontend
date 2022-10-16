<template>
  <v-dialog v-model="isDialogOpen" transition="fab-transition" max-width="1200">
    <template>
      <v-card>
        <v-card-title>
          <v-toolbar-title class="subtitle-1 text-uppercase">
            {{ $t("vacancies.list.title") }}
          </v-toolbar-title>
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
          :single-select="singleSelect"
          v-model="selected"
          item-key="name"
          show-select
        >
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="light" @click="closeDialog">
            {{ $t("vacancies.labels.dialogs.selectVacancy.actions.cancel") }}
          </v-btn>
          <v-btn text color="success" @click="onSelect(selected)">
            {{ $t("vacancies.labels.dialogs.selectVacancy.actions.confirm") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import VacancyService from "@/services/VacancyService";
import { IHeaders, IMeta } from "@/services/types";
import { IVacancy } from "@/services/VacancyService/types";
import { IApplicantQueryParams } from "@/services/ApplicantService/types";

@Component
export default class VacancyListDialog extends Vue {
  protected vacancyService = new VacancyService();
  public search = "";
  public vacancyList: Array<IVacancy> = [];
  public singleSelect = true;
  public selected: Array<IVacancy> = [];
  @PropSync("open")
  public isDialogOpen!: boolean;

  public params = {
    query: "",
  };
  public pagination: IMeta = {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 10,
    to: 1,
    total: 0,
  };

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
        width: "500px",
        sortable: false,
      },
      {
        text: this.$t("vacancies.attributes.department") as string,
        value: "department.name",
        sortable: false,
      },
      {
        text: this.$t("vacancies.attributes.branch_office") as string,
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
    this.search = "";
  }

  get filters(): IApplicantQueryParams {
    return {
      ...this.params,
      page: this.pagination.current_page,
      per_page: this.pagination.per_page,
    };
  }

  getVacancyList(filters = {}): void {
    this.vacancyService
      .getAll(filters)
      .then((response) => {
        this.vacancyList = response.data;
      })
      .catch()
      .finally();
  }

  onSelect(selection: Array<IVacancy>): void {
    const vacancy = selection[0];
    this.$emit("onSelect", vacancy);
    this.closeDialog();
  }

  mounted(): void {
    this.getVacancyList();
  }
}
</script>

<style scoped></style>
