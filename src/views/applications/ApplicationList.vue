<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card elevation="0">
      <v-toolbar flat>
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("applications.list.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="success">
          {{ $t("applications.labels.create") }}
        </v-btn>
      </v-toolbar>
      <v-data-table
        class="elevation-0 mt-5"
        :headers="headers"
        :loading="isLoadingApplicantList"
        :items="applicantList"
        :page.sync="pagination.current_page"
        :items-per-page="pagination.per_page"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.psychometric_test`]="{ item }">
          <a
            class="text-decoration-none"
            target="_blank"
            :href="item.psychometric_test"
          >
            {{ $t("applications.labels.showPsychometricTest") }}
          </a>
        </template>
        <template v-slot:[`item.resume`]="{ item }">
          <a
            class="text-decoration-none"
            target="_blank"
            :href="item.resume.url"
          >
            {{ $t("applications.labels.showResume") }}
          </a>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            class="mx-1"
            color="success"
            x-small
            fab
            @click="editDialog(item)"
          >
            <v-icon dark>mdi-account-edit</v-icon>
          </v-btn>
          <v-btn
            class="mx-1"
            color="primary"
            x-small
            fab
            @click="editDialog(item)"
          >
            <v-icon dark>mdi-account-eye</v-icon>
          </v-btn>
          <v-btn
            class="mx-1"
            color="error"
            x-small
            fab
            @click="deleteDialog(item)"
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-pagination
        v-model="pagination.current_page"
        :length="pagination.last_page"
        @input="search"
      ></v-pagination>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicantService from "@/services/ApplicantService";
import {
  IApplicant,
  IApplicantQueryParams,
} from "@/services/ApplicantService/types";
import { IMeta } from "@/services/types";

@Component
export default class ApplicationList extends Vue {
  protected applicantService = new ApplicantService();
  public applicantList: Array<IApplicant> = [];
  public isLoadingApplicantList = false;
  public headers = [
    {
      text: this.$t("applications.attributes.id"),
      value: "id",
      sortable: false,
    },
    {
      text: this.$t("applications.attributes.names"),
      value: "names",
      sortable: false,
    },
    {
      text: this.$t("applications.attributes.first_surname"),
      value: "first_surname",
      sortable: false,
    },
    {
      text: this.$t("applications.attributes.second_surname"),
      value: "second_surname",
      sortable: false,
    },
    {
      text: this.$t("applications.attributes.email"),
      value: "email",
      sortable: false,
    },
    {
      text: this.$t("applications.attributes.cellphone"),
      value: "cellphone",
      sortable: false,
    },
    {
      text: this.$t("applications.attributes.psychometric_test"),
      value: "psychometric_test",
      sortable: false,
    },
    {
      text: this.$t("applications.attributes.resume"),
      value: "resume",
      sortable: false,
    },
    { text: "", value: "actions", align: "end", sortable: false },
  ];
  public pagination: IMeta = {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 10,
    to: 1,
    total: 0,
  };

  get filters(): IApplicantQueryParams {
    return {
      ...this.params,
      page: this.pagination.current_page,
      per_page: this.pagination.per_page,
    };
  }

  search(): void {
    this.getApplicantList(this.filters);
  }

  getApplicantList(filters = {}): void {
    this.isLoadingApplicantList = true;
    this.applicantService
      .getAll(filters)
      .then((response) => {
        this.applicantList = response.data;
        this.pagination = response.meta;
      })
      .catch()
      .finally(() => {
        this.isLoadingApplicantList = false;
      });
  }

  mounted(): void {
    this.search();
  }
}
</script>

<style scoped></style>
