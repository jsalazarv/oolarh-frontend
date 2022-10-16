<template>
  <v-card elevation="0">
    <template v-if="vacancy.id">
      <v-card-actions class="py-0">
        <div class="ml-2 text-subtitle-1 text-uppercase">
          {{ vacancy.name }}
        </div>
        <v-spacer></v-spacer>
        <v-chip class="ma-2" color="error" label text-color="white">
          <v-icon left> mdi-cash </v-icon>
          {{ vacancy.salary }}
        </v-chip>
      </v-card-actions>
      <v-card-text>
        <div class="text-justify">
          {{ vacancy.description }}
        </div>
      </v-card-text>
      <div>
        <v-divider class="mx-4"></v-divider>
        <small class="grey--text ms-4">
          {{ $t("vacancies.attributes.department") }}:
          <span v-if="vacancy.department">
            {{ vacancy.department.name }}
          </span>
        </small>
        <v-divider class="mx-4"></v-divider>
        <small class="grey--text ms-4">
          {{ $t("vacancies.attributes.branch_office") }}:
          <span v-if="vacancy.branch_office">
            {{ vacancy.branch_office.name }}
          </span>
        </small>
        <v-divider class="mx-4"></v-divider>
      </div>
      <v-card-actions class="mt-6" v-if="selectable">
        <v-spacer class="mx-4"></v-spacer>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              small
              color="primary"
              class="mx-2"
              v-bind="attrs"
              v-on="on"
              :loading="loading"
              :disabled="disabled || loading"
              @click="openVacancyList"
            >
              <v-icon dark> mdi-target </v-icon>
            </v-btn>
          </template>
          <span>{{ $t("applications.labels.selectVacancy") }}</span>
        </v-tooltip>
      </v-card-actions>
    </template>

    <NoTableData
      v-else
      :btn-title="$t('applications.labels.selectVacancy')"
      @onRecord="openVacancyList"
    />

    <VacancyListDialog
      :open.sync="isVacancyDialogOpen"
      @onSelect="onSelectedVacancy"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import VacancyListDialog from "@/components/VacancyList/VacancyListDialog.vue";
import NoTableData from "@/components/NoTableData/NoTableData.vue";
import { IVacancy } from "@/services/VacancyService/types";

@Component({
  components: { NoTableData, VacancyListDialog },
})
export default class VacancySelector extends Vue {
  public isVacancyDialogOpen = false;

  @PropSync("data", { default: () => ({}) })
  vacancy?: IVacancy;

  @PropSync("isDisabled", { default: false })
  disabled!: boolean;

  @PropSync("isLoading", { default: false })
  loading!: boolean;

  @PropSync("isItSelectable", { default: true })
  selectable!: boolean;

  openVacancyList(): void {
    this.isVacancyDialogOpen = true;
  }

  onSelectedVacancy(vacancy: IVacancy): void {
    this.vacancy = vacancy;
  }
}
</script>

<style scoped></style>
