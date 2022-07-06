<template>
  <div v-layout="'app-layout'" class="pa-4">
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <v-card class="pa-4" elevation="0">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 text-uppercase">
            {{ $t("branchOffices.edit.title") }}
          </v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-btn small text disabled color="primary" class="ml-2">
            <v-icon>mdi-domain</v-icon>
            <span class="ml-3">
              {{ $t("branchOffices.labels.branchInformation") }}
            </span>
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
                  :disabled="isEditing"
                  :label="$t('branchOffices.attributes.name')"
                  :loading="isLoadingBranchOfficesData"
                  :error-messages="errors"
                  v-model="branchOffices.name"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-btn small text disabled color="primary" class="ml-2">
            <v-icon>mdi-card-account-phone</v-icon>
            <span class="ml-3">
              {{ $t("branchOffices.labels.contactInformation") }}
            </span>
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
                  :disabled="isEditing || isLoadingBranchOfficesData"
                  :label="$t('branchOffices.attributes.email')"
                  :loading="isLoadingBranchOfficesData"
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
                  :disabled="isEditing || isLoadingBranchOfficesData"
                  :label="$t('branchOffices.attributes.phone')"
                  :loading="isLoadingBranchOfficesData"
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
                  :disabled="isEditing || isLoadingBranchOfficesData"
                  :label="$t('branchOffices.attributes.cellphone')"
                  :loading="isLoadingBranchOfficesData"
                  :error-messages="errors"
                  v-model="branchOffices.cellphone"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-btn small text disabled color="primary" class="ml-2">
            <v-icon>mdi-office-building-marker</v-icon>
            <span class="ml-3">
              {{ $t("branchOffices.labels.locationInformation") }}
            </span>
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
                  :disabled="
                    isLoadingCountries ||
                    isLoadingBranchOfficesData ||
                    isEditing
                  "
                  :loading="isLoadingCountries || isLoadingBranchOfficesData"
                  :label="$t('branchOffices.attributes.country')"
                  :error-messages="errors"
                  v-model="branchOffices.country"
                  @change="getStates(branchOffices.country)"
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
                    isLoadingStates ||
                    !branchOffices.country ||
                    isLoadingBranchOfficesData ||
                    isEditing
                  "
                  :loading="isLoadingStates || isLoadingBranchOfficesData"
                  :label="$t('branchOffices.attributes.state')"
                  :error-messages="errors"
                  v-model="branchOffices.state"
                  @change="
                    getCities(branchOffices.country, branchOffices.state)
                  "
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
                    isLoadingCities ||
                    !branchOffices.state ||
                    isLoadingBranchOfficesData ||
                    isEditing
                  "
                  :loading="isLoadingCities || isLoadingBranchOfficesData"
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
                  :disabled="isLoadingBranchOfficesData || isEditing"
                  :label="$t('branchOffices.attributes.suburb')"
                  :loading="isLoadingBranchOfficesData"
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
                  :disabled="isLoadingBranchOfficesData || isEditing"
                  :label="$t('branchOffices.attributes.street')"
                  :loading="isLoadingBranchOfficesData"
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
                  :disabled="isLoadingBranchOfficesData || isEditing"
                  :label="$t('branchOffices.attributes.outdoor_number')"
                  :loading="isLoadingBranchOfficesData"
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
                  :disabled="isLoadingBranchOfficesData || isEditing"
                  :label="$t('branchOffices.attributes.interior_number')"
                  :loading="isLoadingBranchOfficesData"
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
                  :disabled="isLoadingBranchOfficesData || isEditing"
                  :label="$t('branchOffices.attributes.postal_code')"
                  :loading="isLoadingBranchOfficesData"
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
            :disabled="invalid || isLoadingBranchOfficesData || isEditing"
            :loading="isLoadingBranchOfficesData || isEditing"
            @click="editBranchOffices"
          >
            {{ $t("branchOffices.labels.edit") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IBranchOfficesRequest } from "@/services/BranchOfficesService/types";
import LocationService from "@/services/LocationService";
import BranchOfficesService from "@/services/BranchOfficesService";
import { ICity, ICountry, IState } from "@/services/LocationService/types";

@Component
export default class BranchOfficesEdit extends Vue {
  protected locationService = new LocationService();
  protected branchOfficesService = new BranchOfficesService();
  public isLoadingCountries = false;
  public isLoadingStates = false;
  public isLoadingCities = false;
  public isLoadingBranchOfficesData = false;
  public isEditing = false;
  public branchOffices: IBranchOfficesRequest = {
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

  getStates(country: string): void {
    this.isLoadingStates = true;
    this.locationService
      .getStates(country as string)
      .then((response) => {
        this.states = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingStates = false;
      });
  }

  getCities(country: string, state: string): void {
    this.isLoadingCities = true;
    this.locationService
      .getCities(country as string, state as string)
      .then((response) => {
        this.cities = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingCities = false;
      });
  }

  getBranchOfficesById(): void {
    this.isLoadingBranchOfficesData = true;
    this.branchOfficesService
      .findById(this.$route.params.id)
      .then((response) => {
        this.branchOffices = {
          name: response.data.name,
          email: response.data.contact.email,
          phone: response.data.contact.phone,
          cellphone: response.data.contact.cellphone,
          country: response.data.address.country,
          state: response.data.address.state,
          municipality: response.data.address.municipality,
          suburb: response.data.address.suburb,
          street: response.data.address.street,
          outdoor_number: response.data.address.outdoor_number,
          interior_number: response.data.address.interior_number,
          postal_code: response.data.address.postal_code,
        };
        this.getStates(response.data.address.country);
        this.getCities(
          response.data.address.country,
          response.data.address.state
        );
      })
      .catch()
      .finally(() => {
        this.isLoadingBranchOfficesData = false;
      });
  }

  editBranchOffices(): void {
    this.isEditing = true;
    this.branchOfficesService
      .update(parseInt(this.$route.params.id), this.branchOffices)
      .then()
      .catch()
      .finally(() => {
        this.isEditing = false;
      });
  }

  mounted(): void {
    this.getCountries();
    this.getBranchOfficesById();
  }
}
</script>

<style scoped></style>
