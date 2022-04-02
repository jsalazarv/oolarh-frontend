<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="450"
    transition="fab-transition"
    :persistent="isDeleting"
  >
    <v-card :loading="isDeleting">
      <v-card-title class="subtitle-1 text-uppercase font-weight-regular mb-7">
        {{ $t("departments.labels.dialogs.delete.title") }}
      </v-card-title>
      <v-card-text class="py-0">
        Estás seguro de eliminar:
        <span class="font-weight-black">{{ data.name }}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="light" :disabled="isDeleting" @click="closeDialog">
          {{ $t("departments.labels.dialogs.delete.actions.dismiss") }}
        </v-btn>
        <v-btn
          text
          color="error"
          type="submit"
          :loading="isDeleting"
          :disabled="isDeleting"
          @click="deleteDepartment(data)"
        >
          {{ $t("departments.labels.dialogs.delete.actions.delete") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { IDepartment } from "@/services/DepartmentService/types";
import DepartmentService from "@/services/DepartmentService";

@Component({})
export default class DeleteDialog extends Vue {
  protected departmentService = new DepartmentService();
  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: Object, default: {} })
  data?: IDepartment;
  public isDeleting = false;

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  onDelete(data: IDepartment): void {
    this.isDeleting = false;
    this.closeDialog();
    this.$emit("onDelete", data);
  }

  deleteDepartment(data: IDepartment): void {
    this.isDeleting = true;
    this.departmentService
      .delete(data)
      .then((response) => {
        this.onDelete(response);
      })
      .catch()
      .finally(() => {
        this.isDeleting = false;
      });
  }
}
</script>

<style scoped></style>
