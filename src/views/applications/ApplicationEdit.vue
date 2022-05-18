<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="0" :loading="isLoadingVacancyData">
          <v-card-actions>
            <div class="ml-2 my-4 text-subtitle-1 text-uppercase">
              {{ applicant.vacancy.name }}
            </div>
            <v-spacer></v-spacer>
            <v-chip class="ma-2" color="error" label text-color="white">
              <v-icon left> mdi-cash </v-icon>
              {{ applicant.vacancy.salary }}
            </v-chip>
          </v-card-actions>
          <v-card-text>
            <div class="text-justify">
              {{ applicant.vacancy.description }}
            </div>
          </v-card-text>
          <div>
            <v-divider class="mx-4"></v-divider>
            <small class="grey--text ms-4">
              {{ $t("vacancies.attributes.department") }}:
              {{ applicant.vacancy.department.name }}
            </small>
            <v-divider class="mx-4"></v-divider>
            <small class="grey--text ms-4">
              {{ $t("vacancies.attributes.branch_office") }}:
              {{ applicant.vacancy.branch_office.name }}
            </small>
            <v-divider class="mx-4"></v-divider>
          </div>
          <v-card-actions class="mt-6">
            <v-spacer class="mx-4"></v-spacer>
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  dark
                  small
                  color="primary"
                  class="mx-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark> mdi-target </v-icon>
                </v-btn>
              </template>
              <span>{{ $t("applications.labels.selectVacancy") }}</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <v-card class="pa-4" elevation="0">
            <v-toolbar flat>
              <v-toolbar-title class="subtitle-1 text-uppercase">
                {{ $t("applications.edit.title") }}
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <ValidationProvider
                    :name="$t('applications.attributes.name')"
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
                      :label="$t('applications.attributes.name')"
                      :error-messages="errors"
                      v-model="applicant.names"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <ValidationProvider
                    :name="$t('applications.attributes.first_surname')"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      dense
                      required
                      autocomplete="off"
                      name="first_surname"
                      :disabled="isEditing"
                      :label="$t('applications.attributes.first_surname')"
                      :error-messages="errors"
                      v-model="applicant.first_surname"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <ValidationProvider
                    :name="$t('applications.attributes.second_surname')"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      dense
                      required
                      autocomplete="off"
                      name="second_surname"
                      :disabled="isEditing"
                      :label="$t('applications.attributes.second_surname')"
                      :error-messages="errors"
                      v-model="applicant.second_surname"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <ValidationProvider
                    :name="$t('applications.attributes.email')"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      dense
                      required
                      autocomplete="off"
                      name="email"
                      :disabled="isEditing"
                      :label="$t('applications.attributes.email')"
                      :error-messages="errors"
                      v-model="applicant.email"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <ValidationProvider
                    :name="$t('applications.attributes.cellphone')"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      dense
                      required
                      autocomplete="off"
                      name="cellphone"
                      :disabled="isEditing"
                      :label="$t('applications.attributes.cellphone')"
                      :error-messages="errors"
                      v-model="applicant.cellphone"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <ValidationProvider
                    :name="$t('applications.attributes.psychometric_test')"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      dense
                      required
                      autocomplete="off"
                      name="psychometric_test"
                      :disabled="isEditing"
                      :label="$t('applications.attributes.psychometric_test')"
                      :error-messages="errors"
                      v-model="applicant.psychometric_test"
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
                :disabled="invalid || isEditing"
                :loading="isEditing"
              >
                {{ $t("applications.labels.edit") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </ValidationObserver>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicantService from "@/services/ApplicantService";
import { IApplicant } from "@/services/ApplicantService/types";

@Component
export default class ApplicationEdit extends Vue {
  protected applicantService = new ApplicantService();
  public isEditing = false;
  public isLoadingVacancyData = false;
  public applicant: IApplicant = {
    id: null,
    names: "",
    fullName: "",
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
    first_surname: "",
    second_surname: "",
    email: "",
    cellphone: "",
    psychometric_test: "",
    resume: {
      id: null,
      url: "",
      path: "",
      file_name: "",
    },
    status: "",
  };

  getApplicantById(): void {
    this.isLoadingVacancyData = true;
    this.applicantService
      .findById(this.$route.params.id)
      .then((response) => {
        this.applicant = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingVacancyData = false;
      });
  }

  mounted(): void {
    this.getApplicantById();
  }
}
</script>

<style scoped></style>
