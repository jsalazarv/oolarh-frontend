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
          <v-autocomplete
            dense
            outlined
            required
            autocomplete="off"
            name="gender"
            :label="$t('employees.attributes.gender')"
            :loading="isLoadingGenderList"
            :disabled="isLoadingGenderList"
            :error-messages="errors"
            :items="genders"
            item-text="name"
            item-value="name"
            v-model="employee.gender"
          ></v-autocomplete>
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
import GenderService from "@/services/GenderService";
import { IEmployeeRequest } from "@/services/EmployeeService/types";
import { IGender } from "@/services/GenderService/types";

@Component
export default class GeneralDataForm extends Vue {
  protected genderService = new GenderService();
  public genders: Array<IGender> = [];
  public isLoadingGenderList = false;
  public employee: Partial<IEmployeeRequest> = {
    names: "JUAN",
    first_surname: "SALAZAR",
    second_surname: "VAZQUEZ",
    birthday: "08/03/94",
    gender: "Masculino",
    rfc: "QWERTYUIOP",
    ssn: "1234567890",
    resume: null,
  };

  getGenders(): void {
    this.isLoadingGenderList = true;
    this.genderService
      .getAll()
      .then((response) => {
        this.genders = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingGenderList = false;
      });
  }

  mounted(): void {
    this.getGenders();
  }
}
</script>

<style scoped></style>
