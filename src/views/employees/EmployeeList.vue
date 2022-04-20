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
      >
        <template v-slot:no-data>
          <v-col cols="12">
            <div class="ma-10">
              <img src="/vertical-imagotype-white-and-grey.svg" alt="" />
            </div>
          </v-col>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EmployeeList extends Vue {
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
}
</script>

<style scoped></style>
