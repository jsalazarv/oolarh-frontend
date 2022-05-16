<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card elevation="0">
      <div v-if="!vacancyList.length === true">
        <NoTableData :btn-title="$t('vacancies.create.title')" />
      </div>
      <v-toolbar flat v-if="!vacancyList.length === false">
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("vacancies.list.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="success"
          v-if="!vacancyList.length === false"
          :to="{ name: 'vacancies:create' }"
          :disabled="isLoadingVacancyList"
        >
          {{ $t("departments.labels.create") }}
        </v-btn>
      </v-toolbar>

      <v-data-table
        v-if="!vacancyList.length === false"
        class="elevation-0 mt-5"
        :headers="headers"
        :items="vacancyList"
        :loading="isLoadingVacancyList"
        :page.sync="pagination.current_page"
        :items-per-page="pagination.per_page"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="mx-1" color="primary" x-small fab disabled>
            <v-icon dark>mdi-account-edit</v-icon>
          </v-btn>
          <v-btn class="mx-1" color="primary" x-small fab disabled>
            <v-icon dark>mdi-account-eye</v-icon>
          </v-btn>
          <v-btn
            class="mx-1"
            color="error"
            x-small
            fab
            disabled
            @click="deleteDialog(item)"
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-pagination
        v-model="pagination.current_page"
        v-if="!vacancyList.length === false"
        :length="pagination.last_page"
        @input="search"
      ></v-pagination>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VacancyService from "@/services/VacancyService";
import NoTableData from "@/components/NoTableData/NoTableData.vue";
import {
  IVacanciesQueryParams,
  IVacancy,
} from "@/services/VacancyService/types";
import { IHeaders, IMeta } from "@/services/types";

@Component({
  components: { NoTableData },
})
export default class VacancyList extends Vue {
  protected vacancyService = new VacancyService();
  public vacancyList: Array<IVacancy> = [];
  public isLoadingVacancyList = false;
  public vacancies: IVacancy = {
    id: null,
    name: "",
    description: "",
    salary: "",
    branch_office: null,
    department: null,
    job: {
      id: null,
      name: "",
      description: "",
    },
  };
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
        text: this.$t("vacancies.attributes.salary") as string,
        value: "salary",
        sortable: false,
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ];
  }

  get filters(): IVacanciesQueryParams {
    return {
      ...this.params,
      page: this.pagination.current_page,
      per_page: this.pagination.per_page,
    };
  }

  search(): void {
    this.getVacancyList(this.filters);
  }

  getVacancyList(filters = {}): void {
    this.isLoadingVacancyList = true;
    this.vacancyService
      .getAll(filters)
      .then((response) => {
        this.vacancyList = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingVacancyList = false;
      });
  }

  mounted(): void {
    this.search();
  }
}
</script>

<style scoped></style>
