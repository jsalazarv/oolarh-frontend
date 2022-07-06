<template>
  <ValidationObserver ref="form" v-slot="{ invalid }">
    <v-container fluid class="pa-0">
      <v-card class="pa-4" elevation="0">
        <v-toolbar-title class="subtitle-1 text-uppercase mb-10">
          {{ $t("employees.create.title") }}
        </v-toolbar-title>
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
              <v-autocomplete
                dense
                outlined
                required
                autocomplete="nope"
                name="countries"
                item-text="name"
                item-value="iso2"
                :items="countries"
                :disabled="isLoadingCountries"
                :loading="isLoadingCountries"
                :label="$t('employees.attributes.country')"
                :error-messages="errors"
                v-model="employee.country"
                @change="getStates"
              ></v-autocomplete>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.state')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-autocomplete
                dense
                outlined
                required
                autocomplete="nope"
                name="state"
                item-text="name"
                item-value="iso2"
                :items="states"
                :disabled="isLoadingStates || !employee.country"
                :loading="isLoadingStates"
                :label="$t('employees.attributes.state')"
                :error-messages="errors"
                v-model="employee.state"
                @change="getCities"
              ></v-autocomplete>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.city')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-autocomplete
                dense
                outlined
                required
                autocomplete="nope"
                name="city"
                item-text="name"
                item-value="iso2"
                :items="cities"
                :disabled="isLoadingCities || !employee.state"
                :loading="isLoadingCities"
                :label="$t('employees.attributes.city')"
                :error-messages="errors"
                v-model="employee.city"
              ></v-autocomplete>
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
        <v-card-actions class="white">
          <v-spacer />
          <v-btn depressed small color="primary" @click.prevent="goBack">
            <v-icon dark> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn
            depressed
            small
            color="primary"
            @click.prevent="submit"
            :disabled="invalid"
          >
            <v-icon dark> mdi-chevron-right </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LocationService from "@/services/LocationService";
import { IEmployeeRequest } from "@/services/EmployeeService/types";
import { ICity, ICountry, IState } from "@/services/LocationService/types";

@Component
export default class ContactDataForm extends Vue {
  protected locationService = new LocationService();
  public isLoadingCountries = false;
  public isLoadingStates = false;
  public isLoadingCities = false;
  public countries: Array<ICountry> = [];
  public states: Array<IState> = [];
  public cities: Array<ICity> = [];
  public employee: Partial<IEmployeeRequest> = {
    email: "juan@oolaa.com",
    cellphone: "998118613",
    phone: "5549281837",
    country: "",
    state: "",
    city: "",
    suburb: "Bosques de la colmena",
    street: "Avenida de las flores",
    outdoor_number: "15",
    interior_number: "sn",
    postal_code: "54476",
  };

  submit(): void {
    this.$emit("submit", { ...this.employee });
  }

  goBack(): void {
    this.$emit("back");
  }

  getCountries(): void {
    this.isLoadingCountries = true;
    this.locationService
      .getCountries()
      .then((response) => {
        this.countries = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingCountries = false;
      });
  }

  getStates(): void {
    this.isLoadingStates = true;
    this.locationService
      .getStates(this.employee.country as string)
      .then((response) => {
        this.states = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingStates = false;
      });
  }

  getCities(): void {
    this.isLoadingCities = true;
    this.locationService
      .getCities(this.employee.country as string, this.employee.state as string)
      .then((response) => {
        this.cities = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingCities = false;
      });
  }

  mounted(): void {
    this.getCountries();
  }
}
</script>

<style scoped></style>
