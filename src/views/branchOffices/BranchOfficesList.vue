<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card elevation="0">
      <div v-if="!branchOfficesList.length === true">
        <NoTableData
          @onRecord="redirectToCreation"
          :btn-title="$t('branchOffices.create.title')"
        />
      </div>
      <v-toolbar flat v-if="!branchOfficesList.length === false">
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("branchOffices.list.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="success"
          v-if="!branchOfficesList.length === false"
          :to="{ name: 'branchOffices:create' }"
          :disabled="isLoadingBranchOfficesList"
        >
          {{ $t("departments.labels.create") }}
        </v-btn>
      </v-toolbar>
      <v-data-table
        v-if="!branchOfficesList.length === false"
        class="elevation-0 mt-5"
        :headers="headers"
        :items="branchOfficesList"
        :loading="isLoadingBranchOfficesList"
        :page.sync="pagination.current_page"
        :items-per-page="pagination.per_page"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            class="mx-1"
            color="primary"
            x-small
            fab
            :to="{
              name: 'branchOffices:edit',
              params: { id: item.id },
            }"
          >
            <v-icon dark>mdi-account-edit</v-icon>
          </v-btn>
          <v-btn
            class="mx-1"
            color="primary"
            x-small
            fab
            :to="{
              name: 'branchOffices:show',
              params: { id: item.id },
            }"
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
        v-if="!branchOfficesList.length === false"
        :length="pagination.last_page"
        @input="search"
      ></v-pagination>
    </v-card>
    <DeleteDialog
      :open.sync="openDeleteDialog"
      :data="branchOffices"
      @onDelete="updateListAfterDelete"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BranchOfficesService from "@/services/BranchOfficesService";
import NoTableData from "@/components/NoTableData/NoTableData.vue";
import { IBranchOffices } from "@/services/BranchOfficesService/types";
import { IHeaders, IMeta } from "@/services/types";
import { IApplicantQueryParams } from "@/services/ApplicantService/types";
import DeleteDialog from "@/views/branchOffices/components/DeleteDialog.vue";

@Component({
  components: { DeleteDialog, NoTableData },
})
export default class BranchOfficesList extends Vue {
  protected branchOfficeService = new BranchOfficesService();
  public branchOfficesList: Array<IBranchOffices> = [];
  public isLoadingBranchOfficesList = false;
  public openDeleteDialog = false;
  public branchOffices: IBranchOffices = {
    id: null,
    name: "",
    contact: {
      id: null,
      email: "",
      phone: "",
      cellphone: "",
    },
    address: {
      id: null,
      country: "",
      state: "",
      municipality: "",
      suburb: "",
      street: "",
      outdoor_number: "",
      interior_number: "",
      postal_code: null,
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
        text: this.$t("branchOffices.attributes.id") as string,
        value: "id",
        sortable: false,
      },
      {
        text: this.$t("branchOffices.attributes.name") as string,
        value: "name",
        sortable: false,
      },
      {
        text: this.$t("branchOffices.attributes.email") as string,
        value: "contact.email",
        sortable: false,
      },
      {
        text: this.$t("branchOffices.attributes.cellphone") as string,
        value: "contact.cellphone",
        sortable: false,
      },
      {
        text: this.$t("branchOffices.attributes.country") as string,
        value: "address.country",
        sortable: false,
      },
      {
        text: this.$t("branchOffices.attributes.state") as string,
        value: "address.state",
        sortable: false,
      },
      {
        text: this.$t("branchOffices.attributes.municipality") as string,
        value: "address.municipality",
        sortable: false,
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ];
  }

  get filters(): IApplicantQueryParams {
    return {
      ...this.params,
      page: this.pagination.current_page,
      per_page: this.pagination.per_page,
    };
  }

  redirectToCreation(): void {
    this.$router.push({
      name: "branchOffices:create",
    });
  }

  search(): void {
    this.getBranchOfficesList(this.filters);
  }

  getBranchOfficesList(filters = {}): void {
    this.isLoadingBranchOfficesList = true;
    this.branchOfficeService
      .getAll(filters)
      .then((response) => {
        this.branchOfficesList = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingBranchOfficesList = false;
      });
  }

  deleteDialog(item: IBranchOffices): void {
    this.openDeleteDialog = true;
    this.branchOffices = item;
  }

  updateListAfterDelete(data: IBranchOffices): void {
    let index = this.branchOfficesList.indexOf(data);
    this.branchOfficesList.splice(index, 1);
  }

  mounted(): void {
    this.search();
  }
}
</script>

<style scoped></style>
