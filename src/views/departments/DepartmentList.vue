<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("departments.list.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          :disabled="isLoadingDepartmentList"
          @click="createDialog"
        >
          {{ $t("departments.labels.create") }}
        </v-btn>
      </v-toolbar>
      <v-data-table
        :items-per-page="10"
        class="elevation-1 mt-5"
        :headers="headers"
        :items="departmentList"
        :loading="isLoadingDepartmentList"
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
    </v-card>
    <CreateDialog :open.sync="openCreateDialog" @onCreate="updateList" />
    <EditDialog :open.sync="openEditDialog" :data="department" />
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
import { IDepartment } from "@/services/DepartmentService/types";
import CreateDialog from "@/views/departments/components/CreateDialog.vue";
import EditDialog from "@/views/departments/components/EditDialog.vue";
import DeleteDialog from "@/views/departments/components/DeleteDialog.vue";

@Component({
  components: { DeleteDialog, EditDialog, CreateDialog },
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
    { text: "", value: "actions", align: "end", sortable: false },
  ];

  getDepartmentList(): void {
    this.isLoadingDepartmentList = true;
    this.departmentService
      .getAll()
      .then((response) => {
        this.departmentList = response.data;
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
    this.department = item;
  }

  deleteDialog(item: IDepartment): void {
    this.openDeleteDialog = true;
    this.department = item;
  }

  updateList(data: IDepartment): void {
    this.departmentList.push(data);
  }

  updateListAfterDelete(data: IDepartment): void {
    const index = this.departmentList.indexOf(data);
    this.departmentList.splice(index, 1);
  }

  mounted(): void {
    this.getDepartmentList();
  }
}
</script>

<style scoped></style>
