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
        <v-card class="py-8 px-4" elevation="0">
          <v-toolbar flat class="transparent mb-2">
            <v-spacer />
            <div class="d-flex align-end justify-end">
              <v-stepper
                elevation="0"
                v-model="currentStep"
                max-height="100"
                class="transparent"
              >
                <v-stepper-header class="without-shadow stepper-header-width">
                  <v-stepper-step
                    :complete="currentStep > 1"
                    step="1"
                    class="pa-2"
                  >
                    {{ $t("employees.labels.steps.generalData") }}
                  </v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step
                    :complete="currentStep > 2"
                    step="2"
                    class="pa-2"
                  >
                    {{ $t("employees.labels.steps.contactInformation") }}
                  </v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step
                    :complete="currentStep > 3"
                    step="3"
                    class="pa-2"
                  >
                    {{ $t("employees.labels.steps.employmentData") }}
                  </v-stepper-step>
                </v-stepper-header>
              </v-stepper>
            </div>
          </v-toolbar>
          <v-stepper
            v-model="currentStep"
            alt-labels
            elevation="0"
            class="transparent"
          >
            <v-stepper-items class="mt-5 transparent" elevation="0">
              <v-stepper-content step="1" class="pa-0">
                <GeneralDataForm
                  @submit="submitGeneralDataForm"
                  @clear="cancel"
                  :clen-up.sync="clearable"
                  :data="generalData"
                />
              </v-stepper-content>
              <v-stepper-content step="2" class="pa-0">
                <ContactDataForm
                  @submit="submitContactDataForm"
                  @back="prev"
                  @clear="cancel"
                  :clen-up.sync="clearable"
                />
              </v-stepper-content>
              <v-stepper-content step="3" class="pa-0">
                <EmploymentDataForm />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
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
import ContactDataForm from "@/views/employees/components/partials/ContactDataForm.vue";
import EmploymentDataForm from "@/views/employees/components/partials/EmploymentDataForm.vue";

const initialEmployeeData = {
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

@Component({
  components: {
    EmploymentDataForm,
    ContactDataForm,
    VacancyListDialog,
    VacancySelector,
    GeneralDataForm,
  },
})
export default class EmployeeEdit extends Vue {
  protected employeeService = new EmployeeService();
  public openVacanciesDialog = false;
  public isEditing = false;
  public isLoadingVacancyData = false;
  public currentStep = 1;
  public clearable = false;
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

        this.employeeData.vacancy_id = vacancy.id;
        this.generalData = rest;
        vacancy && this.selectedVacancy(vacancy);
        rest && this.selectedGeneralData(rest);
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

  selectedGeneralData(generalData: any): void {
    this.employeeData.names = generalData.names;
    this.employeeData.first_surname = generalData.first_surname;
    this.employeeData.second_surname = generalData.second_surname;
    this.employeeData.birthday = generalData.birthday;
    this.employeeData.gender = generalData.gender;
    this.employeeData.rfc = generalData.rfc;
    this.employeeData.ssn = generalData.ssn;
    this.employeeData.resume = generalData.resume.name;

    this.generalData = generalData;
  }

  next(): void {
    const nextStep = this.currentStep + 1;

    if (nextStep <= 3) {
      this.currentStep = nextStep;
    }
  }

  prev(): void {
    const prevStep = this.currentStep - 1;

    if (prevStep >= 1) {
      this.currentStep = prevStep;
    }
  }

  cancel(): void {
    this.employeeData = initialEmployeeData;
    this.clearable = true;
    this.prev();
  }

  submitGeneralDataForm(data: Partial<IEmployeeRequest>): void {
    this.employeeData = { ...this.employeeData, ...data };
    this.next();
  }

  submitContactDataForm(data: Partial<IEmployeeRequest>): void {
    this.employeeData = { ...this.employeeData, ...data };
    this.next();
  }

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
