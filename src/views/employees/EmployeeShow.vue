<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card class="pa-4" elevation="0">
      <v-toolbar flat>
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("employees.show.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="success"
          :to="{ name: 'employees:edit' }"
          :disabled="isLoadingEmployeeData"
        >
          {{ $t("employees.labels.edit") }}
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-btn small text disabled color="primary" class="ml-2">
              <v-icon>mdi-domain</v-icon>
              <span class="ml-3">
                {{ $t("employees.labels.steps.generalData") }}
              </span>
            </v-btn>
            <v-row
              class="rounded mb-2 mx-0"
              style="border: 1px solid lightgrey"
            >
              <v-col cols="12">
                <div class="pa-8">
                  <p>
                    {{ $t("employees.attributes.name") }}:
                    <strong>{{ employee.fullName }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.birthday") }}:
                    <strong>{{ employee.birthday }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.gender") }}:
                    <strong>{{ employee.gender }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.rfc") }}:
                    <strong>{{ employee.rfc }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.ssn") }}:
                    <strong>{{ employee.ssn }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.resume") }}:
                    <strong>
                      <a
                        class="text-decoration-none"
                        target="_blank"
                        :href="employee.resume.url"
                      >
                        {{ $t("employees.labels.showResume") }}
                      </a>
                    </strong>
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn small text disabled color="primary" class="ml-2">
              <v-icon>mdi-domain</v-icon>
              <span class="ml-3">
                {{ $t("employees.labels.steps.contactInformation") }}
              </span>
            </v-btn>
            <v-row
              class="rounded mb-2 mx-0"
              style="border: 1px solid lightgrey"
            >
              <v-col cols="12" md="6">
                <div class="pa-8">
                  <p>
                    {{ $t("employees.attributes.email") }}:
                    <strong>{{ employee.contact.email }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.phone") }}:
                    <strong>{{ employee.contact.phone }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.cellphone") }}:
                    <strong>{{ employee.contact.cellphone }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.country") }}:
                    <strong>{{ employee.address.country }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.state") }}:
                    <strong>{{ employee.address.state }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.city") }}:
                    <strong>{{ employee.address.municipality }}</strong>
                  </p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="pa-8">
                  <p>
                    {{ $t("employees.attributes.suburb") }}:
                    <strong>{{ employee.address.suburb }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.street") }}:
                    <strong>{{ employee.address.street }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.outdoor_number") }}:
                    <strong>{{ employee.address.outdoor_number }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.interior_number") }}:
                    <strong>{{ employee.address.interior_number }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.postal_code") }}:
                    <strong>{{ employee.address.postal_code }}</strong>
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn small text disabled color="primary" class="ml-2">
              <v-icon>mdi-domain</v-icon>
              <span class="ml-3">
                {{ $t("employees.labels.steps.employmentData") }}
              </span>
            </v-btn>
            <v-row
              class="rounded mb-2 mx-0"
              style="border: 1px solid lightgrey"
            >
              <v-col cols="12">
                <div class="pa-8">
                  <p>
                    {{ $t("employees.attributes.vacancy") }}:
                    <strong>{{ employee.vacancy.name }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.salary") }}:
                    <strong>{{ employee.vacancy.salary }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.branchOffices") }}:
                    <strong>{{ employee.vacancy.branch_office.name }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.country") }}:
                    <strong>{{ employee.address.country }}</strong>
                  </p>
                  <p>
                    {{ $t("employees.attributes.psychometric_test") }}:
                    <strong>
                      <a
                        class="text-decoration-none"
                        target="_blank"
                        :href="employee.psychometric_test"
                      >
                        {{ $t("employees.labels.showPsychometricTest") }}
                      </a>
                    </strong>
                  </p>
                  <p>
                    {{ $t("employees.labels.status") }}:
                    <strong>
                      {{
                        employee.employee_status === "active"
                          ? $t("employees.labels.active")
                          : $t("employees.labels.inactive")
                      }}
                    </strong>
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EmployeeService from "@/services/EmployeeService";
import { IEmployeeResponse } from "@/services/EmployeeService/types";

@Component({})
export default class EmployeeShow extends Vue {
  protected employeeService = new EmployeeService();
  public isLoadingEmployeeData = false;
  employee: IEmployeeResponse = {
    id: null,
    names: "",
    first_surname: "",
    second_surname: "",
    fullName: "",
    birthday: "",
    gender: "",
    rfc: "",
    ssn: "",
    resume: {
      id: null,
      url: "",
      path: "",
      file_name: "",
    },
    contact: {
      id: null,
      email: "",
      phone: "",
      cellphone: "",
    },
    address: {
      id: null,
      country: "",
      state: "",
      municipality: "",
      suburb: "",
      street: "",
      outdoor_number: "",
      interior_number: "",
      postal_code: "",
    },
    vacancy: {
      id: null,
      name: "",
      description: "",
      salary: "",
      branch_office: {
        id: null,
        name: "",
        contact: {
          id: null,
          email: "",
          phone: "",
          cellphone: "",
        },
        address: {
          id: null,
          country: "",
          state: "",
          municipality: "",
          suburb: "",
          street: "",
          outdoor_number: "",
          interior_number: "",
          postal_code: null,
        },
      },
      department: {
        id: null,
        name: "",
      },
      job: {
        id: null,
        name: "",
        description: "",
      },
    },
    psychometric_test: "",
    salary: "",
    employee_status: "",
    profile_status: "",
  };

  getEmployeeData(): void {
    this.isLoadingEmployeeData = true;
    this.employeeService
      .findById(this.$route.params.id)
      .then((response) => {
        this.employee = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingEmployeeData = false;
      });
  }

  mounted(): void {
    this.getEmployeeData();
  }
}
</script>

<style scoped></style>
