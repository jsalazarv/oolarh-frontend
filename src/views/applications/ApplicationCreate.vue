<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="0" v-if="!applicant.vacancy_id">
          <NoTableData
            :btn-title="$t('applications.labels.selectVacancy')"
            @onRecord="vacanciesDialog"
          />
        </v-card>
        <v-card class="pa-4" elevation="0" v-if="applicant.vacancy_id">
          <v-card-actions>
            <div class="ml-2 my-4 text-subtitle-1 text-uppercase">
              {{ vacancy.name }}
            </div>
            <v-spacer></v-spacer>
            <v-chip class="ma-2" color="error" label text-color="white">
              <v-icon left> mdi-cash </v-icon>
              {{ vacancy.salary }}
            </v-chip>
          </v-card-actions>
          <v-card-text>
            <div class="text-justify">
              {{ vacancy.description }}
            </div>
          </v-card-text>
          <div>
            <v-divider class="mx-4"></v-divider>
            <small class="grey--text ms-4">
              {{ $t("vacancies.attributes.department") }}:
              {{ vacancy.department.name }}
            </small>
            <v-divider class="mx-4"></v-divider>
            <small class="grey--text ms-4">
              {{ $t("vacancies.attributes.branch_office") }}:
              {{ vacancy.branch_office.name }}
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
                  @click="vacanciesDialog"
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
                {{ $t("applications.create.title") }}
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
                      :disabled="isCreating"
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
                      :disabled="isCreating"
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
                      :disabled="isCreating"
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
                      :disabled="isCreating"
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
                      :disabled="isCreating"
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
                      :disabled="isCreating"
                      :label="$t('applications.attributes.psychometric_test')"
                      :error-messages="errors"
                      v-model="applicant.psychometric_test"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <ValidationProvider
                    :name="$t('applications.attributes.resume')"
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
                      :disabled="isCreating"
                      :label="$t('applications.attributes.resume')"
                      :error-messages="errors"
                      :value="applicant.resume"
                      v-model="applicant.resume"
                    ></v-file-input>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <ValidationProvider
                    :name="$t('applications.attributes.vacancy')"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="hidden"
                      name="vacancy"
                      v-model="applicant.vacancy_id"
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-card-actions class="justify-end">
                <v-btn
                  small
                  color="success"
                  type="submit"
                  :disabled="invalid || isCreating"
                  :loading="isCreating"
                  @click="createApplicant"
                >
                  {{ $t("applications.labels.create") }}
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </ValidationObserver>
      </v-col>
    </v-row>
    <VacancyListDialog
      :open.sync="openVacanciesDialog"
      @onSelect="selectedVacancy"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicantService from "@/services/ApplicantService";
import { IApplicantRequest } from "@/services/ApplicantService/types";
import { IValidationObserver } from "@/components/types";
import VacancyListDialog from "@/components/VacancyList/VacancyListDialog.vue";
import { IVacancy } from "@/services/VacancyService/types";
import NoTableData from "@/components/NoTableData/NoTableData.vue";

const initialApplicantData: IApplicantRequest = {
  id: null,
  names: "",
  vacancy_id: null,
  first_surname: "",
  second_surname: "",
  email: "",
  cellphone: "",
  psychometric_test: "",
  resume: null,
};

@Component({
  components: { NoTableData, VacancyListDialog },
})
export default class ApplicationCreate extends Vue {
  protected applicantService = new ApplicantService();
  public openVacanciesDialog = false;
  public isCreating = false;
  public resume = null;
  public vacancy = {};
  public applicant: IApplicantRequest = {
    id: null,
    names: "",
    vacancy_id: null,
    first_surname: "",
    second_surname: "",
    email: "",
    cellphone: "",
    psychometric_test: "",
    resume: null,
  };

  clear(): void {
    this.applicant = { ...initialApplicantData };
    (this.$refs.form as IValidationObserver).reset();
  }

  vacanciesDialog(): void {
    this.openVacanciesDialog = true;
  }

  selectedVacancy(vacancy: IVacancy): void {
    this.applicant.vacancy_id = vacancy.id;
    this.vacancy = vacancy;
  }

  createApplicant(): void {
    this.isCreating = true;
    this.applicantService
      .create(this.applicant)
      .then((response) => {
        if (response.data) {
          this.clear();
          this.$router.push({
            name: "application:list",
          });
        }
      })
      .catch()
      .finally(() => {
        this.isCreating = false;
      });
  }
}
</script>

<style scoped></style>
