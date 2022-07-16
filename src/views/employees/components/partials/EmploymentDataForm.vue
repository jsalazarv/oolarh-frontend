<template>
  <ValidationObserver ref="form" v-slot="{ invalid }">
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="pa-4" elevation="0" v-if="!applicant.vacancy_id">
            <NoTableData
              :btn-title="$t('applications.labels.selectVacancy')"
              @onRecord="vacanciesDialog"
            />
          </v-card>
          <v-card v-if="applicant.vacancy_id" class="py-8 px-4" elevation="0">
            <VacancySelector :data="vacancy" @onRecord="vacanciesDialog" />
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card class="px-4 py-2" elevation="0">
            <v-toolbar-title class="subtitle-1 text-uppercase mb-10">
              {{ $t("employees.create.title") }}
            </v-toolbar-title>
            <v-row>
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employees.attributes.psychometric_test')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
                    outlined
                    required
                    autocomplete="nope"
                    name="psychometric_test"
                    :label="$t('employees.attributes.psychometric_test')"
                    :error-messages="errors"
                    v-model="employee.psychometric_test"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employees.attributes.salary')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
                    outlined
                    required
                    autocomplete="nope"
                    name="salary"
                    :label="$t('employees.attributes.salary')"
                    :error-messages="errors"
                    v-model="employee.salary"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>

            <v-card-actions class="white">
              <v-spacer />
              <v-btn depressed small color="primary" @click="cancel">
                Cancelar
              </v-btn>
              <v-btn depressed small color="primary" @click.prevent="goBack">
                <v-icon dark> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn
                depressed
                small
                color="success"
                @click.prevent="submit"
                :disabled="invalid || creating"
                :loading="creating"
              >
                Registrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <VacancyListDialog
        :open.sync="openVacanciesDialog"
        @onSelect="selectedVacancy"
      />
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Watch } from "vue-property-decorator";
import { IEmployeeRequest } from "@/services/EmployeeService/types";
import { IApplicantRequest } from "@/services/ApplicantService/types";
import NoTableData from "@/components/NoTableData/NoTableData.vue";
import VacancyListDialog from "@/components/VacancyList/VacancyListDialog.vue";
import { IVacancy } from "@/services/VacancyService/types";
import VacancySelector from "@/components/VacancySelector/VacancySelector.vue";

const initEmployeeData = {
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
  components: { VacancySelector, VacancyListDialog, NoTableData },
})
export default class EmploymentDataForm extends Vue {
  public openVacanciesDialog = false;
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
  public vacancy = {};
  public employee: Partial<IEmployeeRequest> = {
    vacancy_id: null,
    psychometric_test: "",
    salary: "",
  };

  @PropSync("isCreating", { default: false })
  public creating!: boolean;

  @PropSync("clenUp", { default: false })
  public clearable!: boolean;

  vacanciesDialog(): void {
    this.openVacanciesDialog = true;
  }

  selectedVacancy(vacancy: IVacancy): void {
    this.applicant.vacancy_id = vacancy.id;
    this.employee.vacancy_id = vacancy.id;
    this.vacancy = vacancy;
  }

  submit(): void {
    this.$emit("submit", { ...this.employee });
  }

  goBack(): void {
    this.$emit("back");
  }

  cancel(): void {
    this.$emit("clear", { ...this.employee });
    if (this.clearable) {
      this.employee = initEmployeeData;
    }
  }

  @Watch("clearable")
  clear(): void {
    this.cancel();
    this.$emit("clear", { ...this.employee });
  }
}
</script>

<style scoped></style>
