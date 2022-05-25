<template>
  <v-container fluid class="pa-0 pt-5">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="0" v-if="!applicant.vacancy_id">
          <NoTableData
            :btn-title="$t('applications.labels.selectVacancy')"
            @onRecord="vacanciesDialog"
          />
        </v-card>
        <v-card v-if="applicant.vacancy_id" class="py-8 px-4" elevation="0">
          <VacancySelector
            :data="vacancy"
            :is-disabled="isCreating"
            @onRecord="vacanciesDialog"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.psychometric_test')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                dense
                outlined
                required
                autocomplete="nope"
                name="psychometric_test"
                :label="$t('employees.attributes.psychometric_test')"
                :error-messages="errors"
                v-model="employee.psychometric_test"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.salary')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                dense
                outlined
                required
                autocomplete="nope"
                name="salary"
                :label="$t('employees.attributes.salary')"
                :error-messages="errors"
                v-model="employee.salary"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <VacancyListDialog
      :open.sync="openVacanciesDialog"
      @onSelect="selectedVacancy"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IEmployeeRequest } from "@/services/EmployeeService/types";
import { IApplicantRequest } from "@/services/ApplicantService/types";
import NoTableData from "@/components/NoTableData/NoTableData.vue";
import VacancyListDialog from "@/components/VacancyList/VacancyListDialog.vue";
import { IVacancy } from "@/services/VacancyService/types";
import VacancySelector from "@/components/VacancySelector/VacancySelector.vue";
@Component({
  components: { VacancySelector, VacancyListDialog, NoTableData },
})
export default class EmploymentDataForm extends Vue {
  public openVacanciesDialog = false;
  public isCreating = false;
  public applicant: IApplicantRequest = {
    id: null,
    names: "",
    vacancy_id: null,
    first_surname: "",
    second_surname: "",
    email: "",
    cellphone: "",
    psychometric_test: "",
    resume: null,
  };
  public vacancy = {};
  public employee: Partial<IEmployeeRequest> = {
    vacancy: null,
    psychometric_test: "",
    employee_number: null,
    salary: null,
  };

  vacanciesDialog(): void {
    this.openVacanciesDialog = true;
  }

  selectedVacancy(vacancy: IVacancy): void {
    this.applicant.vacancy_id = vacancy.id;
    this.vacancy = vacancy;
  }
}
</script>

<style scoped></style>
