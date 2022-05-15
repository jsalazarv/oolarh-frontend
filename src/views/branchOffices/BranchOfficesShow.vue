<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card class="pa-4" elevation="0">
      <v-toolbar flat>
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("branchOffices.show.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="success"
          :to="{ name: 'branchOffices:edit' }"
          :disabled="isLoadingBranchOfficesData"
        >
          {{ $t("branchOffices.labels.edit") }}
        </v-btn>
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
              <v-text-field
                dense
                outlined
                required
                autocomplete="nope"
                name="countries"
                disabled
                :loading="isLoadingBranchOfficesData"
                :label="$t('branchOffices.attributes.country')"
                :error-messages="errors"
                v-model="branchOffices.country"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="3">
            <ValidationProvider
              :name="$t('branchOffices.attributes.state')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                dense
                outlined
                required
                autocomplete="nope"
                name="state"
                disabled
                :loading="isLoadingBranchOfficesData"
                :label="$t('branchOffices.attributes.state')"
                :error-messages="errors"
                v-model="branchOffices.state"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="3">
            <ValidationProvider
              :name="$t('branchOffices.attributes.municipality')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                dense
                outlined
                required
                autocomplete="nope"
                disabled
                :loading="isLoadingBranchOfficesData"
                :label="$t('branchOffices.attributes.municipality')"
                :error-messages="errors"
                v-model="branchOffices.municipality"
              ></v-text-field>
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
                :label="$t('branchOffices.attributes.postal_code')"
                :loading="isLoadingBranchOfficesData"
                :error-messages="errors"
                v-model="branchOffices.postal_code"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BranchOfficesService from "@/services/BranchOfficesService";
import { IBranchOfficesRequest } from "@/services/BranchOfficesService/types";

@Component
export default class BranchOfficesShow extends Vue {
  protected branchOfficesService = new BranchOfficesService();
  public isLoadingBranchOfficesData = false;
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
      })
      .catch()
      .finally(() => {
        this.isLoadingBranchOfficesData = false;
      });
  }

  mounted(): void {
    this.getBranchOfficesById();
  }
}
</script>

<style scoped></style>
