<template>
  <v-container fluid class="pa-0 pt-5">
    <v-row>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.email')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="email"
            :label="$t('employees.attributes.email')"
            :error-messages="errors"
            v-model="employee.email"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.phone')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="phone"
            :label="$t('employees.attributes.phone')"
            :error-messages="errors"
            v-model="employee.phone"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.cellphone')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="cellphone"
            :label="$t('employees.attributes.cellphone')"
            :error-messages="errors"
            v-model="employee.cellphone"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.country')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="country"
            :label="$t('employees.attributes.country')"
            :error-messages="errors"
            v-model="employee.country"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.state')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="state"
            :label="$t('employees.attributes.state')"
            :error-messages="errors"
            v-model="employee.state"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.municipality')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="municipality"
            :label="$t('employees.attributes.municipality')"
            :error-messages="errors"
            v-model="employee.municipality"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.suburb')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="suburb"
            :label="$t('employees.attributes.suburb')"
            :error-messages="errors"
            v-model="employee.suburb"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.street')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="street"
            :label="$t('employees.attributes.street')"
            :error-messages="errors"
            v-model="employee.street"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.outdoor_number')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="outdoor_number"
            :label="$t('employees.attributes.outdoor_number')"
            :error-messages="errors"
            v-model="employee.outdoor_number"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.interior_number')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="interior_number"
            :label="$t('employees.attributes.interior_number')"
            :error-messages="errors"
            v-model="employee.interior_number"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="4">
        <ValidationProvider
          :name="$t('employees.attributes.postal_code')"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            dense
            outlined
            required
            autocomplete="nope"
            name="postal_code"
            :label="$t('employees.attributes.postal_code')"
            :error-messages="errors"
            v-model="employee.postal_code"
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
export default class ContactDataForm extends Vue {
  public employee: Partial<IEmployeeRequest> = {
    email: "",
    phone: "",
    country: "",
    state: "",
    municipality: "",
    suburb: "",
    street: "",
    outdoor_number: "",
    interior_number: "",
    postal_code: "",
  };
}
</script>

<style scoped></style>
