<template>
  <v-container fluid class="pa-0 pt-5">
    <v-row>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.vacancy')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="vacancy"
            :label="$t('employees.attributes.vacancy')"
            :error-messages="errors"
            v-model="employee.vacancy"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
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
          :name="$t('employees.attributes.employee_number')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="employee_number"
            :label="$t('employees.attributes.employee_number')"
            :error-messages="errors"
            v-model="employee.employee_number"
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
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IEmployeeRequest } from "@/services/EmployeeService/types";

@Component
export default class EmploymentDataForm extends Vue {
  public employee: Partial<IEmployeeRequest> = {
    vacancy: null,
    psychometric_test: "",
    employee_number: null,
    salary: null,
  };
}
</script>

<style scoped></style>
