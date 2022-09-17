<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card elevation="0">
      <div v-if="!departmentList.length === true">
        <NoTableData
          @onRecord="createDialog"
          :btn-title="$t('departments.create.title')"
        />
      </div>
      <v-toolbar flat v-if="!departmentList.length === false">
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("departments.list.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="success"
          v-if="!departmentList.length === false"
          :disabled="isLoadingDepartmentList"
          @click="createDialog"
        >
          {{ $t("departments.labels.create") }}
        </v-btn>
      </v-toolbar>
      <v-data-table
        v-if="!departmentList.length === false"
        class="elevation-0 mt-5"
        :headers="headers"
        :items="departmentList"
        :loading="isLoadingDepartmentList"
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
            @click="editDialog(item)"
          >
            <v-icon dark>mdi-account-edit</v-icon>
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
        v-if="!departmentList.length === false"
        @input="search"
      ></v-pagination>
    </v-card>
    <CreateDialog
      :open.sync="openCreateDialog"
      @onCreate="updateListAfterCreate"
    />
    <EditDialog
      :open.sync="openEditDialog"
      :data="department"
      @onEdit="updateListAfterEdit"
    />
    <DeleteDialog
      :open.sync="openDeleteDialog"
      :data="department"
      @onDelete="updateListAfterDelete"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DepartmentService from "@/services/DepartmentService";
import {
  IDepartment,
  IDepartmentQueryParams,
} from "@/services/DepartmentService/types";
import CreateDialog from "@/views/departments/components/CreateDialog.vue";
import EditDialog from "@/views/departments/components/EditDialog.vue";
import DeleteDialog from "@/views/departments/components/DeleteDialog.vue";
import { IHeaders, IMeta } from "@/services/types";
import NoTableData from "@/components/NoTableData/NoTableData.vue";
import Parser from "fast-xml-parser";

@Component({
  components: { NoTableData, DeleteDialog, EditDialog, CreateDialog },
})
export default class DepartmentList extends Vue {
  protected departmentService = new DepartmentService();
  public departmentList: Array<IDepartment> = [];
  public isLoadingDepartmentList = false;
  public openCreateDialog = false;
  public openEditDialog = false;
  public openDeleteDialog = false;
  public department: IDepartment = {
    id: null,
    name: "",
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

  public parser = new Parser.XMLParser();

  get headers(): Array<IHeaders> {
    return [
      {
        text: this.$t("departments.attributes.id") as string,
        value: "id",
        sortable: false,
      },
      {
        text: this.$t("departments.attributes.name") as string,
        value: "name",
        sortable: false,
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ];
  }

  get filters(): IDepartmentQueryParams {
    return {
      ...this.params,
      page: this.pagination.current_page,
      per_page: this.pagination.per_page,
    };
  }

  search(): void {
    this.getDepartmentList(this.filters);
  }

  getDepartmentList(filters = {}): void {
    this.isLoadingDepartmentList = true;
    this.departmentService
      .getAll(filters)
      .then((response) => {
        const responseType = typeof response;

        if (responseType === "object") {
          this.departmentList = response.data;
          this.pagination = response.meta;
        }

        const {
          root: {
            data: { item: parsingResponse },
          },
        } = this.parser.parse(response);

        this.departmentList = parsingResponse;
      })
      .finally(() => {
        this.isLoadingDepartmentList = false;
      });
  }

  createDialog(): void {
    this.openCreateDialog = true;
  }

  editDialog(item: IDepartment): void {
    this.openEditDialog = true;
    this.department = { ...item };
  }

  deleteDialog(item: IDepartment): void {
    this.openDeleteDialog = true;
    this.department = item;
  }

  updateListAfterCreate(data: IDepartment): void {
    this.departmentList.push(data);
  }

  updateListAfterEdit(data: IDepartment): void {
    let index = this.departmentList.findIndex(
      (element) => element.id === data.id
    );
    this.departmentList.splice(index, 1, data);
  }

  updateListAfterDelete(data: IDepartment): void {
    let index = this.departmentList.indexOf(data);
    this.departmentList.splice(index, 1);
  }

  mounted(): void {
    this.search();
  }
}
</script>

<style scoped></style>
