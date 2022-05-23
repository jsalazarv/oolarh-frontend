<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="py-8 px-4" elevation="0">
          <VacancySelector
            :data="applicant.vacancy"
            :is-loading="isLoadingVacancyData"
            :is-disabled="isEditing"
            @onRecord="vacanciesDialog"
          />
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
                      :loading="isLoadingVacancyData"
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
                      :loading="isLoadingVacancyData"
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
                      :loading="isLoadingVacancyData"
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
                      :loading="isLoadingVacancyData"
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
                      :loading="isLoadingVacancyData"
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
                      :loading="isLoadingVacancyData"
                      :disabled="isEditing"
                      :label="$t('applications.attributes.psychometric_test')"
                      :error-messages="errors"
                      v-model="applicant.psychometric_test"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <CustomFileInput
                    :file-name="applicant.resume.file_name"
                    :is-loading="isLoadingVacancyData"
                    :is-disabled="isEditing"
                    @onFileChanged="updateFileValue"
                  />
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
                @click="update"
              >
                {{ $t("applications.labels.edit") }}
              </v-btn>
            </v-card-actions>
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
import {
  IApplicant,
  IUpdateApplicant,
} from "@/services/ApplicantService/types";
import CustomFileInput from "@/views/applications/components/CustomFileInput.vue";
import { IVacancy } from "@/services/VacancyService/types";
import VacancyListDialog from "@/components/VacancyList/VacancyListDialog.vue";
import VacancySelector from "@/components/VacancySelector/VacancySelector.vue";

@Component({
  components: { VacancySelector, VacancyListDialog, CustomFileInput },
})
export default class ApplicationEdit extends Vue {
  protected applicantService = new ApplicantService();
  public openVacanciesDialog = false;
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

  public updatedResume: File | null = null;
  public updatedVacancy: number | null = null;

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

  vacanciesDialog(): void {
    this.openVacanciesDialog = true;
  }

  selectedVacancy(vacancy: IVacancy): void {
    this.updatedVacancy = vacancy.id;
    this.applicant.vacancy = vacancy;
  }

  updateFileValue(data: File): void {
    this.updatedResume = data;
  }

  update(): void {
    const data: IUpdateApplicant = {
      names: this.applicant.names,
      vacancy_id: this.updatedVacancy,
      first_surname: this.applicant.first_surname,
      second_surname: this.applicant.second_surname,
      email: this.applicant.email,
      cellphone: this.applicant.cellphone,
      psychometric_test: this.applicant.psychometric_test,
      resume: this.updatedResume,
      status: this.applicant.status,
    };

    if (!(data.resume instanceof File)) delete data.resume;

    this.isEditing = true;
    this.applicantService
      .update(parseInt(this.$route.params.id), data)
      .then(() => {
        //TODO: response handling
      })
      .catch()
      .finally(() => {
        this.isEditing = false;
      });
  }

  mounted(): void {
    this.getApplicantById();
  }
}
</script>

<style scoped></style>
