<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="450"
    transition="fab-transition"
    :persistent="isDeleting"
  >
    <v-card :loading="isDeleting">
      <v-card-title class="subtitle-1 text-uppercase font-weight-regular mb-7">
        {{ $t("employees.labels.dialogs.delete.title") }}
      </v-card-title>

      <v-card-text class="py-0">
        ¿{{
          $t(
            "employees.labels.dialogs.delete.labels.areYouSureYouWantToDelete"
          )
        }}:
        <span class="font-weight-black">{{ data.names }}&nbsp;</span>
        <span class="font-weight-black">{{ data.first_surname }}&nbsp;</span>
        <span class="font-weight-black">{{ data.second_surname }}</span>
        {{
          $t("employees.labels.dialogs.delete.labels.fromTheListOfApplicants")
        }}:?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="light" :disabled="isDeleting" @click="closeDialog">
          {{ $t("employees.labels.dialogs.delete.actions.dismiss") }}
        </v-btn>
        <v-btn
          text
          color="error"
          type="submit"
          :loading="isDeleting"
          :disabled="isDeleting"
          @click="deleteEmployee(data)"
        >
          {{ $t("employees.labels.dialogs.delete.actions.delete") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import EmployeeService from "@/services/EmployeeService";
import { IEmployee } from "@/services/EmployeeService/types";

@Component
export default class DeleteDialog extends Vue {
  protected employeeService = new EmployeeService();
  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: Object, default: {} })
  data?: IEmployee;

  public isDeleting = false;

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  onDelete(data: IEmployee): void {
    this.isDeleting = false;
    this.closeDialog();
    this.$emit("onDelete", data);
  }

  deleteEmployee(data: IEmployee): void {
    this.isDeleting = true;
    this.employeeService
      .delete(data)
      .then(() => {
        this.onDelete(data);
      })
      .catch()
      .finally(() => {
        this.isDeleting = false;
      });
  }
}
</script>

<style scoped></style>
