<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="py-8 px-4" elevation="0">
          <VacancySelector
            :data="vacancy"
            :is-loading="isLoadingVacancyData"
            :is-disabled="isEditing"
            @onRecord="vacanciesDialog"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="py-8 px-4" elevation="0"> </v-card>
      </v-col>
      <pre>{{ employeeData }}</pre>
    </v-row>
    <VacancyListDialog
      :open.sync="openVacanciesDialog"
      @onSelect="selectedVacancy"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EmployeeService from "@/services/EmployeeService";
import GeneralDataForm from "@/views/employees/components/partials/GeneralDataForm.vue";
import VacancySelector from "@/components/VacancySelector/VacancySelector.vue";
import VacancyListDialog from "@/components/VacancyList/VacancyListDialog.vue";
import { IEmployeeRequest } from "@/services/EmployeeService/types";
import { IVacancy } from "@/services/VacancyService/types";

@Component({
  components: { VacancyListDialog, VacancySelector, GeneralDataForm },
})
export default class EmployeeEdit extends Vue {
  protected employeeService = new EmployeeService();
  public openVacanciesDialog = false;
  public isEditing = false;
  public isLoadingVacancyData = false;
  public currentStep = 1;
  employeeData: IEmployeeRequest = {
    names: "",
    vacancy_id: null,
    first_surname: "",
    second_surname: "",
    email: "",
    cellphone: "",
    psychometric_test: "",
    birthday: "",
    gender: "",
    rfc: "",
    ssn: "",
    resume: null,
    phone: "",
    country: "",
    state: "",
    municipality: "",
    suburb: "",
    street: "",
    outdoor_number: "",
    interior_number: "",
    postal_code: "",
    salary: "",
  };

  public vacancy = {};
  public generalData = {};

  getEmployeeData(): void {
    this.isLoadingVacancyData = true;
    this.employeeService
      .findById(this.$route.params.id)
      .then((response) => {
        const { resume, contact, address, vacancy, ...rest } = response.data;

        vacancy && this.selectedVacancy(vacancy);
        //this.selectedGeneralData(rest);
      })
      .catch()
      .finally(() => {
        this.isLoadingVacancyData = false;
      });
  }

  vacanciesDialog(): void {
    this.openVacanciesDialog = true;
  }

  selectedVacancy(vacancy: IVacancy): void {
    this.employeeData.vacancy_id = vacancy.id;
    this.vacancy = vacancy;
  }

  /*selectedGeneralData(generalData: any): void {
    this.employeeData.names = generalData.names;
    this.employeeData.first_surname = generalData.first_surname;
    this.employeeData.second_surname = generalData.second_surname;
    this.employeeData.birthday = generalData.birthday;
    this.employeeData.gender = generalData.gender;
    this.employeeData.rfc = generalData.rfc;
    this.employeeData.ssn = generalData.ssn;
    this.employeeData.resume = generalData.resume.name;
    //this.generalData = generalData;
  }*/

  mounted(): void {
    this.getEmployeeData();
  }
}
</script>

<style scoped lang="scss">
.without-shadow {
  box-shadow: none;
}
.stepper-header-width {
  width: 700px;
}
</style>
