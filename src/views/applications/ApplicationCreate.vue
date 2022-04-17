<template>
  <div v-layout="'app-layout'" class="pa-4">
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
                <v-text-field
                  outlined
                  dense
                  required
                  autocomplete="off"
                  name="vacancy"
                  :disabled="isCreating"
                  :label="$t('applications.attributes.vacancy')"
                  :error-messages="errors"
                  v-model="applicant.vacancy"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-card-actions class="justify-end">
            <v-btn
              color="success"
              class="px-8"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicantService from "@/services/ApplicantService";
import { IApplicant } from "@/services/ApplicantService/types";
import { IValidationObserver } from "@/components/types";

const initialApplicantData: IApplicant = {
  id: null,
  names: "",
  vacancy: null,
  first_surname: "",
  second_surname: "",
  email: "",
  cellphone: "",
  psychometric_test: "",
  resume: null,
};

@Component
export default class ApplicationCreate extends Vue {
  protected applicantService = new ApplicantService();
  public isCreating = false;
  public resume = null;
  public applicant: IApplicant = {
    id: null,
    names: "",
    vacancy: null,
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

  createApplicant(): void {
    this.isCreating = true;
    this.applicantService
      .create(this.applicant)
      .then((response) => {
        if (response.data) {
          this.$router.push({
            name: "application:list",
          });
        }
      })
      .catch()
      .finally(() => {
        this.isCreating = false;
        this.clear();
      });
  }
}
</script>

<style scoped></style>
