<template>
  <div v-layout="'app-layout'" class="pa-4">
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <v-card class="pa-4" elevation="0">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 text-uppercase">
            {{ $t("branchOffices.create.title") }}
          </v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-btn small text disabled color="primary" class="ml-2">
            <v-icon>mdi-domain</v-icon>
            <span class="ml-3">Información de la sucursal</span>
          </v-btn>
          <v-row class="rounded mb-2 mx-0" style="border: 1px solid lightgrey">
            <v-col cols="12" md="4">
              <ValidationProvider
                :name="$t('branchOffices.attributes.name')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  dense
                  required
                  autocomplete="off"
                  name="name"
                  :disabled="isCreating"
                  :label="$t('branchOffices.attributes.name')"
                  :error-messages="errors"
                  v-model="branchOffices.name"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-btn small text disabled color="primary" class="ml-2">
            <v-icon>mdi-card-account-phone</v-icon>
            <span class="ml-3">Información de contacto</span>
          </v-btn>
          <v-row class="rounded mb-2 mx-0" style="border: 1px solid lightgrey">
            <v-col cols="12" md="4">
              <ValidationProvider
                :name="$t('branchOffices.attributes.email')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  dense
                  required
                  autocomplete="off"
                  name="email"
                  :disabled="isCreating"
                  :label="$t('branchOffices.attributes.email')"
                  :error-messages="errors"
                  v-model="branchOffices.email"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="4">
              <ValidationProvider
                :name="$t('branchOffices.attributes.phone')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  dense
                  required
                  autocomplete="off"
                  name="phone"
                  :disabled="isCreating"
                  :label="$t('branchOffices.attributes.phone')"
                  :error-messages="errors"
                  v-model="branchOffices.phone"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="4">
              <ValidationProvider
                :name="$t('branchOffices.attributes.cellphone')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  dense
                  required
                  autocomplete="off"
                  name="cellphone"
                  :disabled="isCreating"
                  :label="$t('branchOffices.attributes.cellphone')"
                  :error-messages="errors"
                  v-model="branchOffices.cellphone"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-btn small text disabled color="primary" class="ml-2">
            <v-icon>mdi-office-building-marker</v-icon>
            <span class="ml-3">Información de ubicación</span>
          </v-btn>
          <v-row class="rounded mb-2 mx-0" style="border: 1px solid lightgrey">
            <v-col cols="12" md="3">
              <ValidationProvider
                :name="$t('branchOffices.attributes.country')"
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
                  :disabled="isLoadingCountries || isCreating"
                  :loading="isLoadingCountries"
                  :label="$t('branchOffices.attributes.country')"
                  :error-messages="errors"
                  v-model="branchOffices.country"
                  @change="getStates"
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="3">
              <ValidationProvider
                :name="$t('branchOffices.attributes.state')"
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
                  :disabled="
                    isLoadingStates || !branchOffices.country || isCreating
                  "
                  :loading="isLoadingStates"
                  :label="$t('branchOffices.attributes.state')"
                  :error-messages="errors"
                  v-model="branchOffices.state"
                  @change="getCities"
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="3">
              <ValidationProvider
                :name="$t('branchOffices.attributes.municipality')"
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
                  :disabled="
                    isLoadingCities || !branchOffices.state || isCreating
                  "
                  :loading="isLoadingCities"
                  :label="$t('branchOffices.attributes.municipality')"
                  :error-messages="errors"
                  v-model="branchOffices.municipality"
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="3">
              <ValidationProvider
                :name="$t('branchOffices.attributes.suburb')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  dense
                  required
                  autocomplete="off"
                  name="suburb"
                  :disabled="isCreating"
                  :label="$t('branchOffices.attributes.suburb')"
                  :error-messages="errors"
                  v-model="branchOffices.suburb"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="3">
              <ValidationProvider
                :name="$t('branchOffices.attributes.street')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  dense
                  required
                  autocomplete="nope"
                  name="street"
                  :disabled="isCreating"
                  :label="$t('branchOffices.attributes.street')"
                  :error-messages="errors"
                  v-model="branchOffices.street"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="3">
              <ValidationProvider
                :name="$t('branchOffices.attributes.outdoor_number')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  dense
                  required
                  autocomplete="nope"
                  name="outdoor_number"
                  :disabled="isCreating"
                  :label="$t('branchOffices.attributes.outdoor_number')"
                  :error-messages="errors"
                  v-model="branchOffices.outdoor_number"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="3">
              <ValidationProvider
                :name="$t('branchOffices.attributes.interior_number')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  dense
                  required
                  autocomplete="nope"
                  name="interior_number"
                  :disabled="isCreating"
                  :label="$t('branchOffices.attributes.interior_number')"
                  :error-messages="errors"
                  v-model="branchOffices.interior_number"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="3">
              <ValidationProvider
                :name="$t('branchOffices.attributes.postal_code')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  dense
                  required
                  autocomplete="nope"
                  name="postal_code"
                  :disabled="isCreating"
                  :label="$t('branchOffices.attributes.postal_code')"
                  :error-messages="errors"
                  v-model="branchOffices.postal_code"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            small
            color="success"
            type="submit"
            :disabled="invalid || isCreating"
            :loading="isCreating"
            @click="createBranchOffices"
          >
            {{ $t("branchOffices.labels.create") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IBranchOfficesRequest } from "@/services/BranchOfficesService/types";
import { ICity, ICountry, IState } from "@/services/LocationService/types";
import LocationService from "@/services/LocationService";
import BranchOfficesService from "@/services/BranchOfficesService";
import { IValidationObserver } from "@/components/types";

const initialBranchOfficesData: IBranchOfficesRequest = {
  name: "",
  email: "",
  phone: "",
  cellphone: "",
  country: "",
  state: "",
  municipality: "",
  suburb: "",
  street: "",
  outdoor_number: "",
  interior_number: "",
  postal_code: null,
};

@Component
export default class BranchOfficesCreate extends Vue {
  protected locationService = new LocationService();
  protected branchOfficesService = new BranchOfficesService();
  public isLoadingCountries = false;
  public isLoadingStates = false;
  public isLoadingCities = false;
  public isCreating = false;
  public branchOffices: IBranchOfficesRequest = {
    name: "Polanco",
    email: "polanco@oolaa.com",
    phone: "58273740",
    cellphone: "5549281835",
    country: "",
    state: "",
    municipality: "",
    suburb: "Bosques de la Colmena",
    street: "Avenida de las Flores",
    outdoor_number: "sn",
    interior_number: "sn",
    postal_code: 54476,
  };
  public countries: Array<ICountry> = [];
  public states: Array<IState> = [];
  public cities: Array<ICity> = [];

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
      .getStates(this.branchOffices.country as Partial<ICountry>)
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
      .getCities(
        this.branchOffices.country as Partial<ICountry>,
        this.branchOffices.state as Partial<IState>
      )
      .then((response) => {
        this.cities = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingCities = false;
      });
  }

  clear(): void {
    this.branchOffices = { ...initialBranchOfficesData };
    (this.$refs.form as IValidationObserver).reset();
  }

  createBranchOffices(): void {
    this.isCreating = true;
    this.branchOfficesService
      .create(this.branchOffices)
      .then((response) => {
        if (response.data) {
          this.clear();
          this.$router.push({
            name: "branchOffices:list",
          });
        }
      })
      .catch()
      .finally();
  }

  mounted(): void {
    this.getCountries();
  }
}
</script>

<style scoped></style>
