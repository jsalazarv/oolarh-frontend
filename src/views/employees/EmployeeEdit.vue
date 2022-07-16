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
        </v-stepper-items>
      </v-stepper>
      <pre>
        {{ employeeData }}
      </pre>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EmployeeService from "@/services/EmployeeService";
import GeneralDataForm from "@/views/employees/components/partials/GeneralDataForm.vue";
import {
  IEmployeeRequest,
  IEmployeeResponse,
} from "@/services/EmployeeService/types";

@Component({
  components: { GeneralDataForm },
})
export default class EmployeeEdit extends Vue {
  protected employeeService = new EmployeeService();
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

  getEmployeeData(): void {
    this.employeeService
      .findById(this.$route.params.id)
      .then((response) => {
        console.log(response.data);
        const { resume, contact, address, vacancy, ...rest } = response.data;
        //this.employeeData = response.data;
      })
      .catch()
      .finally();
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
