<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card elevation="0">
      <v-toolbar flat>
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("employees.list.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small color="success" disabled>
          {{ $t("employees.labels.create") }}
        </v-btn>
      </v-toolbar>
      <v-data-table
        class="elevation-0 mt-5"
        hide-default-footer
        :headers="headers"
        :loading="isLoadingEmployeeList"
        :items="employeeList"
        :page.sync="pagination.current_page"
        :items-per-page="pagination.per_page"
        @page-count="pageCount = $event"
      >
        <template v-slot:no-data>
          <v-col cols="12">
            <div class="ma-10">
              <img src="/vertical-imagotype-white-and-grey.svg" alt="" />
            </div>
          </v-col>
        </template>

        <template v-slot:[`item.psychometric_test`]="{ item }">
          <a
            class="text-decoration-none"
            target="_blank"
            :href="item.psychometric_test"
          >
            {{ $t("employees.labels.showPsychometricTest") }}
          </a>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            class="mx-1"
            color="success"
            x-small
            fab
            disabled
            @click="editDialog(item)"
          >
            <v-icon dark>mdi-account-edit</v-icon>
          </v-btn>
          <v-btn
            class="mx-1"
            color="primary"
            x-small
            fab
            disabled
            @click="editDialog(item)"
          >
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
        :length="pagination.last_page"
        @input="search"
      ></v-pagination>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EmployeeService from "@/services/EmployeeService";
import {
  IEmployee,
  IEmployeeQueryParams,
} from "@/services/EmployeeService/types";
import { IMeta } from "@/services/types";

@Component
export default class EmployeeList extends Vue {
  public employeeService = new EmployeeService();
  public employeeList: Array<IEmployee> = [];
  public isLoadingEmployeeList = false;
  public employee: IEmployee = {
    id: null,
    names: "",
    fullName: "",
    vacancy: null,
    first_surname: "",
    second_surname: "",
    email: "",
    cellphone: "",
    psychometric_test: "",
    status: "",
  };
  public params = {
    query: "",
  };
  public headers = [
    {
      text: this.$t("employees.attributes.id"),
      value: "id",
      sortable: false,
    },
    {
      text: this.$t("employees.attributes.name"),
      value: "fullName",
      sortable: false,
    },
    {
      text: this.$t("employees.attributes.email"),
      value: "email",
      sortable: false,
    },
    {
      text: this.$t("employees.attributes.cellphone"),
      value: "cellphone",
      sortable: false,
    },
    {
      text: this.$t("employees.attributes.psychometric_test"),
      value: "psychometric_test",
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

  get filters(): IEmployeeQueryParams {
    return {
      ...this.params,
      page: this.pagination.current_page,
      per_page: this.pagination.per_page,
    };
  }

  search(): void {
    this.getEmployeeList(this.filters);
  }

  getEmployeeList(filters = {}): void {
    this.isLoadingEmployeeList = true;
    this.employeeService
      .getAll(filters)
      .then((response) => {
        this.employeeList = response.data;
        this.pagination = response.meta;
      })
      .catch()
      .finally(() => {
        this.isLoadingEmployeeList = false;
      });
  }

  mounted(): void {
    this.search();
  }
}
</script>

<style scoped></style>
