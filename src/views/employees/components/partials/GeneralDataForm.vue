<template>
  <v-container fluid class="pa-0 pt-5">
    <v-row>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.name')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="off"
            name="name"
            :label="$t('employees.attributes.name')"
            :error-messages="errors"
            v-model="employee.names"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.first_surname')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="off"
            name="first_surname"
            :label="$t('employees.attributes.first_surname')"
            :error-messages="errors"
            v-model="employee.first_surname"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.second_surname')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="off"
            name="second_surname"
            :label="$t('employees.attributes.second_surname')"
            :error-messages="errors"
            v-model="employee.second_surname"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.birthday')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="off"
            name="birthday"
            :label="$t('employees.attributes.birthday')"
            :error-messages="errors"
            v-model="employee.birthday"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.gender')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="off"
            name="gender"
            :label="$t('employees.attributes.gender')"
            :error-messages="errors"
            v-model="employee.gender"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.rfc')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="off"
            name="rfc"
            :label="$t('employees.attributes.rfc')"
            :error-messages="errors"
            v-model="employee.rfc"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.ssn')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="off"
            name="ssn"
            :label="$t('employees.attributes.ssn')"
            :error-messages="errors"
            v-model="employee.ssn"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.resume')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-file-input
            outlined
            dense
            required
            autocomplete="off"
            name="resume"
            accept=".pdf"
            prepend-icon=""
            prepend-inner-icon="mdi-file-account"
            :label="$t('employees.attributes.resume')"
            :error-messages="errors"
            :value="employee.resume"
            v-model="employee.resume"
          ></v-file-input>
        </ValidationProvider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IEmployeeRequest } from "@/services/EmployeeService/types";

@Component
export default class GeneralDataForm extends Vue {
  public employee: Partial<IEmployeeRequest> = {
    names: "",
    first_surname: "",
    second_surname: "",
    birthday: "",
    gender: "",
    rfc: "",
    ssn: "",
    resume: null,
  };
}
</script>

<style scoped></style>
