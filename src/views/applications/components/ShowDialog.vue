<template>
  <v-dialog v-model="isDialogOpen" max-width="750" transition="fab-transition">
    <v-card>
      <v-card-title class="subtitle-1 text-uppercase font-weight-regular mb-7">
        {{ $t("applications.labels.dialogs.show.title") }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <p class="mb-2 d-flex align-center">
              <v-icon small class="mr-2">mdi-account</v-icon>
              {{ data.fullName }}
            </p>
            <p class="mb-2 d-flex align-center">
              <v-icon small class="mr-2">mdi-email</v-icon>
              {{ data.email }}
            </p>
            <p class="mb-2 d-flex align-center">
              <v-icon small class="mr-2">mdi-cellphone</v-icon>
              {{ data.cellphone }}
            </p>
            <p class="mb-2 d-flex align-center">
              <v-icon small class="mr-2">mdi-file-account</v-icon>
              <a
                class="text-decoration-none"
                :href="data.resume.url"
                target="_blank"
              >
                {{ $t("applications.attributes.resume") }}
              </a>
            </p>
            <p class="mb-2 d-flex align-center">
              <v-icon small class="mr-2">mdi-head-snowflake</v-icon>
              <a
                class="text-decoration-none"
                :href="data.psychometric_test"
                target="_blank"
              >
                {{ $t("applications.attributes.psychometric_test") }}
              </a>
            </p>
          </v-col>
          <v-divider class="mx-4" inset vertical />
          <v-col cols="12" md="7">
            <v-card elevation="0">
              <v-card-actions class="py-0">
                <div class="ml-2 text-subtitle-1 text-uppercase">
                  {{ data.vacancy.name }}
                </div>
                <v-spacer></v-spacer>
                <v-chip class="mx-2" color="error" label text-color="white">
                  <v-icon left> mdi-cash </v-icon>
                  {{ data.vacancy.salary }}
                </v-chip>
              </v-card-actions>
              <v-card-text>
                <div class="text-justify">
                  {{ data.vacancy.description }}
                </div>
              </v-card-text>
              <div>
                <v-divider class="mx-4"></v-divider>
                <small class="grey--text ms-4">
                  {{ $t("vacancies.attributes.department") }}:
                  {{ data.vacancy.department.name }}
                </small>
                <v-divider class="mx-4"></v-divider>
                <small class="grey--text ms-4">
                  {{ $t("vacancies.attributes.branch_office") }}:
                  {{ data.vacancy.branch_office.name }}
                </small>
                <v-divider class="mx-4"></v-divider>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="light" @click="closeDialog">
          {{ $t("applications.labels.dialogs.show.actions.close") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import ApplicantService from "@/services/ApplicantService";
import { IApplicant } from "@/services/ApplicantService/types";

@Component
export default class ShowDialog extends Vue {
  protected applicantService = new ApplicantService();
  @PropSync("open")
  public isDialogOpen!: boolean;

  @Prop({ type: Object, default: {} })
  data?: IApplicant;

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
</script>

<style scoped></style>
