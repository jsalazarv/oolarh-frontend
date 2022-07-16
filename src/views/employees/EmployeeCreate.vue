<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card class="pa-4 transparent" elevation="0">
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
              <v-stepper-step :complete="currentStep > 1" step="1" class="pa-2">
                {{ $t("employees.labels.steps.generalData") }}
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="currentStep > 2" step="2" class="pa-2">
                {{ $t("employees.labels.steps.contactInformation") }}
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="currentStep > 3" step="3" class="pa-2">
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
            <EmploymentDataForm
              @submit="submitEmploymentDataForm"
              @back="prev"
              @clear="cancel"
              :clen-up.sync="clearable"
              :is-creating="isCreating"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EmployeeService from "@/services/EmployeeService";
import GeneralDataForm from "@/views/employees/components/partials/GeneralDataForm.vue";
import ContactDataForm from "@/views/employees/components/partials/ContactDataForm.vue";
import EmploymentDataForm from "@/views/employees/components/partials/EmploymentDataForm.vue";
import { IEmployeeRequest } from "@/services/EmployeeService/types";

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
    GeneralDataForm,
  },
})
export default class EmployeeCreate extends Vue {
  protected employeeService = new EmployeeService();
  public currentStep = 1;
  public isCreating = false;
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

  submitEmploymentDataForm(data: Partial<IEmployeeRequest>): void {
    this.employeeData = { ...this.employeeData, ...data };
    this.createEmployee();
  }

  createEmployee(): void {
    this.isCreating = true;
    this.employeeService
      .create(this.employeeData)
      .then((response) => {
        if (response) {
          this.cancel();
          this.$router.push({
            name: "employees:list",
          });
        }
      })
      .catch()
      .finally(() => {
        this.isCreating = false;
      });
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
