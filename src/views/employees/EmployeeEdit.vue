<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="py-8 px-4" elevation="0">
          <VacancySelector
            :data="vacancy"
            :is-loading="isLoadingVacancyData"
            :is-disabled="isEditing"
            @update:data="updateVacancy"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="py-8 px-4" elevation="0">
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
                  :clearable="clearable"
                  :data="generalData"
                />
              </v-stepper-content>
              <v-stepper-content step="2" class="pa-0">
                <ContactDataForm
                  @submit="submitContactDataForm"
                  @back="prev"
                  :clearable="clearable"
                  :data="contactData"
                />
              </v-stepper-content>
              <v-stepper-content step="3" class="pa-0">
                <EmploymentDataForm
                  @submit="submitEmploymentDataForm"
                  @back="prev"
                  :clearable="clearable"
                  :data="employmentData"
                />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
          <pre>{{ employeeData }}</pre>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EmployeeService from "@/services/EmployeeService";
import GeneralDataForm from "@/views/employees/components/partials/GeneralDataForm.vue";
import VacancySelector from "@/components/VacancySelector/VacancySelector.vue";
import VacancyListDialog from "@/components/VacancyList/VacancyListDialog.vue";
import {
  IAddress,
  IContact,
  IEmployeeRequest,
  IEmployeeResponse,
} from "@/services/EmployeeService/types";
import { IVacancy } from "@/services/VacancyService/types";
import ContactDataForm from "@/views/employees/components/partials/ContactDataForm.vue";
import EmploymentDataForm from "@/views/employees/components/partials/EmploymentDataForm.vue";

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
  public isEditing = false;
  public isLoadingVacancyData = false;
  public currentStep = 1;
  public clearable = true;
  employee: IEmployeeResponse | Record<string, unknown> = {};
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

  public vacancy: any = {};
  public generalData: any = {};
  public contactData: any = {};
  public employmentData: any = {};

  getEmployeeData(): void {
    this.isLoadingVacancyData = true;
    this.employeeService
      .findById(this.$route.params.id)
      .then((response) => {
        const { contact, address, vacancy, ...generalData } = response.data;

        this.employee = response.data;

        vacancy && this.updateVacancy(vacancy);
        generalData && this.updateGeneralData(generalData);
        contact && this.updateContactData(contact, address);
        generalData && this.updateEmploymentData(generalData);
      })
      .catch()
      .finally(() => {
        this.isLoadingVacancyData = false;
      });
  }

  updateVacancy(vacancy: IVacancy): void {
    this.vacancy = vacancy;
    this.employeeData.vacancy_id = vacancy.id;
  }

  updateGeneralData(generalData: any): void {
    this.generalData = generalData;

    this.employeeData.names = generalData.names;
    this.employeeData.first_surname = generalData.first_surname;
    this.employeeData.second_surname = generalData.second_surname;
    this.employeeData.birthday = generalData.birthday;
    this.employeeData.gender = generalData.gender;
    this.employeeData.rfc = generalData.rfc;
    this.employeeData.ssn = generalData.ssn;
    this.employeeData.resume = generalData.resume;
  }

  updateContactData(contactData: any, addressData: any): void {
    this.contactData = { ...contactData, ...addressData };

    this.employeeData.email = this.contactData.email;
    this.employeeData.phone = this.contactData.phone;
    this.employeeData.cellphone = this.contactData.cellphone;
    this.employeeData.country = this.contactData.country;
    this.employeeData.state = this.contactData.state;
    this.employeeData.municipality = this.contactData.municipality;
    this.employeeData.suburb = this.contactData.suburb;
    this.employeeData.street = this.contactData.street;
    this.employeeData.outdoor_number = this.contactData.outdoor_number;
    this.employeeData.interior_number = this.contactData.interior_number;
    this.employeeData.postal_code = this.contactData.postal_code;
  }

  updateEmploymentData(generalData: any): void {
    this.employmentData = generalData;

    this.employeeData.salary = generalData.salary;
    this.employeeData.psychometric_test = generalData.psychometric_test;
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
    const { resume, contact, address, vacancy, ...rest } = this.employee;

    vacancy && this.updateVacancy(vacancy as IVacancy);
    rest && this.updateGeneralData(rest);
    this.prev();
  }

  submitGeneralDataForm(data: any): void {
    this.updateGeneralData(data);
    this.next();
  }

  submitContactDataForm(contact: IContact, address: IAddress): void {
    this.updateContactData(contact, address);
    this.next();
  }

  submitEmploymentDataForm(data: any): void {
    this.updateEmploymentData(data);
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
