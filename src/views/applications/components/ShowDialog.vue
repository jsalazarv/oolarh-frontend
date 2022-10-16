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
            <VacancySelector :data="data.vacancy" :is-it-selectable="false" />
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
import VacancySelector from "@/components/VacancySelector/VacancySelector.vue";
@Component({
  components: { VacancySelector },
})
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
