<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-row>
      <v-col cols="12" md="4">
        <v-card
          class="pa-4"
          elevation="0"
          :loading="isLoadingVacancyData"
        ></v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicantService from "@/services/ApplicantService";

@Component
export default class ApplicationEdit extends Vue {
  protected applicantService = new ApplicantService();
  public isLoadingVacancyData = false;

  getApplicantById(): void {
    this.isLoadingVacancyData = true;
    this.applicantService
      .findById(this.$route.params.id)
      .then((response) => {
        console.log("Applicant Data: ", response.data);
      })
      .catch()
      .finally();
  }

  mounted(): void {
    this.getApplicantById();
  }
}
</script>

<style scoped></style>
