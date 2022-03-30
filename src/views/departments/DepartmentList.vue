<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("departments.list.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="success">
          {{ $t("departments.labels.create") }}
        </v-btn>
      </v-toolbar>
      <v-data-table
        :items-per-page="5"
        class="elevation-1 mt-5"
        :headers="headers"
        :items="departmentList"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DepartmentService from "@/services/DepartmentService";
import { IDepartment } from "@/services/DepartmentService/types";

@Component({})
export default class DepartmentList extends Vue {
  protected departmentService = new DepartmentService();
  public departmentList: Array<IDepartment> = [];
  public isLoadingDepartmentList = false;
  public headers = [
    {
      text: this.$t("departments.attributes.id"),
      value: "id",
      sortable: false,
    },
    {
      text: this.$t("departments.attributes.name"),
      value: "name",
      sortable: false,
    },
  ];

  getDepartmentList(): void {
    this.isLoadingDepartmentList = true;
    this.departmentService.getAll().then((response) => {
      this.departmentList = response.data;
    });
  }

  mounted(): void {
    this.getDepartmentList();
  }
}
</script>

<style scoped></style>
