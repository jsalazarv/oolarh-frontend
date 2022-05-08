<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="450"
    transition="fab-transition"
    :persistent="isDeleting"
  >
    <v-card :loading="isDeleting">
      <v-card-title class="subtitle-1 text-uppercase font-weight-regular mb-7">
        {{ $t("jobs.labels.dialogs.delete.title") }}
      </v-card-title>
      <v-card-text class="py-0">
        ¿{{ $t("jobs.labels.dialogs.delete.labels.areYouSureToDelete") }}:
        <span class="font-weight-black"> {{ data.name }} </span>?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="light" :disabled="isDeleting" @click="closeDialog">
          {{ $t("jobs.labels.dialogs.delete.actions.dismiss") }}
        </v-btn>
        <v-btn
          text
          color="error"
          type="submit"
          :loading="isDeleting"
          :disabled="isDeleting"
          @click="deleteJob(data)"
        >
          {{ $t("jobs.labels.dialogs.delete.actions.delete") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import JobService from "@/services/JobService";
import { IJob } from "@/services/JobService/types";

@Component
export default class DeleteDialog extends Vue {
  protected jobService = new JobService();
  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: Object, default: {} })
  data?: IJob;
  public isDeleting = false;

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  onDelete(data: IJob): void {
    this.isDeleting = false;
    this.closeDialog();
    this.$emit("onDelete", data);
  }

  deleteJob(data: IJob): void {
    this.isDeleting = true;
    this.jobService
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
