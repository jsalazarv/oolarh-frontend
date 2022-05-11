<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="450"
    transition="fab-transition"
    :persistent="isDeleting"
  >
    <v-card :loading="isDeleting">
      <v-card-title class="subtitle-1 text-uppercase font-weight-regular mb-7">
        {{ $t("branchOffices.labels.dialogs.delete.title") }}
      </v-card-title>
      <v-card-text class="py-0">
        ¿{{
          $t(
            "branchOffices.labels.dialogs.delete.labels.areYouSureYouWantToDelete"
          )
        }}: <span class="font-weight-black">{{ data.name }}</span>
        {{
          $t(
            "branchOffices.labels.dialogs.delete.labels.fromTheListOfBranchOffices"
          )
        }}?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="light" :disabled="isDeleting" @click="closeDialog">
          {{ $t("branchOffices.labels.dialogs.delete.actions.dismiss") }}
        </v-btn>
        <v-btn
          text
          color="error"
          type="submit"
          :loading="isDeleting"
          :disabled="isDeleting"
          @click="deleteBranchOffices(data)"
        >
          {{ $t("branchOffices.labels.dialogs.delete.actions.delete") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import BranchOfficesService from "@/services/BranchOfficesService";
import { IBranchOffices } from "@/services/BranchOfficesService/types";

@Component({})
export default class DeleteDialog extends Vue {
  protected branchOfficesService = new BranchOfficesService();
  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: Object, default: {} })
  data?: IBranchOffices;
  public isDeleting = false;

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  onDelete(data: IBranchOffices): void {
    this.isDeleting = false;
    this.closeDialog();
    this.$emit("onDelete", data);
  }

  deleteBranchOffices(data: IBranchOffices): void {
    this.isDeleting = true;
    this.branchOfficesService
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
