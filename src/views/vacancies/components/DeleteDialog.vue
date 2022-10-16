<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="450"
    transition="fab-transition"
    :persistent="isDeleting"
  >
    <v-card :loading="isDeleting">
      <v-card-title class="subtitle-1 text-uppercase font-weight-regular mb-7">
        {{ $t("vacancies.labels.dialogs.delete.title") }}
      </v-card-title>
      <v-card-text class="py-0">
        ¿{{
          $t(
            "vacancies.labels.dialogs.delete.labels.areYouSureYouWantToDelete"
          )
        }}: <span class="font-weight-black">{{ data.name }}</span>
        {{
          $t("vacancies.labels.dialogs.delete.labels.fromTheListOfVacancies")
        }}?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="light" :disabled="isDeleting" @click="closeDialog">
          {{ $t("vacancies.labels.dialogs.delete.actions.dismiss") }}
        </v-btn>
        <v-btn
          text
          color="error"
          type="submit"
          :loading="isDeleting"
          :disabled="isDeleting"
          @click="deleteBranchOffices(data)"
        >
          {{ $t("vacancies.labels.dialogs.delete.actions.delete") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import VacancyService from "@/services/VacancyService";
import { IVacancy } from "@/services/VacancyService/types";

@Component({})
export default class DeleteDialog extends Vue {
  protected vacancyService = new VacancyService();
  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: Object, default: {} })
  data?: IVacancy;
  public isDeleting = false;

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  onDelete(data: IVacancy): void {
    this.isDeleting = false;
    this.closeDialog();
    this.$emit("onDelete", data);
  }

  deleteBranchOffices(data: IVacancy): void {
    this.isDeleting = true;
    this.vacancyService
      .delete(data.id as number)
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
