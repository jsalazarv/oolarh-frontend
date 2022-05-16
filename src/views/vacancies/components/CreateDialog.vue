<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="450"
    transition="fab-transition"
    :persistent="isCreating"
    @click:outside="closeDialog"
  >
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <v-card :loading="isCreating">
        <v-card-title
          class="subtitle-1 text-uppercase font-weight-regular mb-7"
        >
          {{ $t("vacancies.labels.dialogs.create.title") }}
        </v-card-title>
        <v-card-text class="py-0">
          <v-row>
            <v-col class="py-0" cols="12">
              <ValidationProvider
                :name="$t('vacancies.attributes.name')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  dense
                  outlined
                  required
                  autocomplete="off"
                  name="name"
                  v-model="vacancy.name"
                  :disabled="isCreating"
                  :label="$t('vacancies.attributes.name')"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <ValidationProvider
                :name="$t('vacancies.attributes.salary')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  dense
                  outlined
                  required
                  autocomplete="off"
                  name="salary"
                  v-model="vacancy.salary"
                  :disabled="isCreating"
                  :label="$t('vacancies.attributes.salary')"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <ValidationProvider
                :name="$t('vacancies.attributes.branch_office')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-autocomplete
                  dense
                  outlined
                  required
                  autocomplete="nope"
                  name="branch_office"
                  item-text="name"
                  item-value="id"
                  :items="branchOfficesList"
                  :disabled="isLoadingBranchOfficesList || isCreating"
                  :loading="isLoadingBranchOfficesList"
                  :label="$t('vacancies.attributes.branch_office')"
                  :error-messages="errors"
                  v-model="vacancy.branch_office_id"
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <ValidationProvider
                :name="$t('vacancies.attributes.department')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-autocomplete
                  dense
                  outlined
                  required
                  autocomplete="nope"
                  name="department"
                  item-text="name"
                  item-value="id"
                  :items="departmentList"
                  :disabled="isLoadingDepartmentList || isCreating"
                  :loading="isLoadingDepartmentList"
                  :label="$t('vacancies.attributes.department')"
                  :error-messages="errors"
                  v-model="vacancy.department_id"
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <ValidationProvider
                :name="$t('vacancies.attributes.job')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-autocomplete
                  dense
                  outlined
                  required
                  autocomplete="nope"
                  name="job"
                  item-text="name"
                  item-value="id"
                  :items="jobList"
                  :disabled="isLoadingJobList || isCreating"
                  :loading="isLoadingJobList"
                  :label="$t('vacancies.attributes.job')"
                  :error-messages="errors"
                  v-model="vacancy.job_id"
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col class="py-0" cols="12">
              <ValidationProvider
                :name="$t('vacancies.attributes.description')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-textarea
                  dense
                  outlined
                  required
                  auto-grow
                  autocomplete="off"
                  name="description"
                  rows="5"
                  row-height="15"
                  v-model="vacancy.description"
                  :disabled="isCreating"
                  :label="$t('vacancies.attributes.description')"
                  :error-messages="errors"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="light" :disabled="isCreating" @click="closeDialog">
            {{ $t("vacancies.labels.dialogs.create.actions.dismiss") }}
          </v-btn>
          <v-btn
            text
            color="success"
            type="submit"
            :loading="isCreating"
            :disabled="isCreating || invalid"
            @click="createVacancy"
          >
            {{ $t("vacancies.labels.dialogs.create.actions.create") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import VacancyService from "@/services/VacancyService";
import BranchOfficesService from "@/services/BranchOfficesService";
import DepartmentService from "@/services/DepartmentService";
import JobService from "@/services/JobService";
import { IValidationObserver } from "@/components/types";
import { IVacancy, IVacancyRequest } from "@/services/VacancyService/types";
import { IBranchOffices } from "@/services/BranchOfficesService/types";
import { IDepartment } from "@/services/DepartmentService/types";
import { IJob } from "@/services/JobService/types";

const initialVacancyData: IVacancyRequest = {
  id: null,
  name: "",
  description: "",
  salary: "",
  branch_office_id: null,
  department_id: null,
  job_id: null,
};

@Component({})
export default class CreationDialog extends Vue {
  protected vacancyService = new VacancyService();
  protected branchOfficeService = new BranchOfficesService();
  protected departmentService = new DepartmentService();
  protected jobService = new JobService();

  @PropSync("open")
  public isDialogOpen!: boolean;

  public isLoadingBranchOfficesList = false;
  public isLoadingDepartmentList = false;
  public isLoadingJobList = false;
  public branchOfficesList: Array<IBranchOffices> = [];
  public departmentList: Array<IDepartment> = [];
  public jobList: Array<IJob> = [];
  public isCreating = false;
  public vacancy: IVacancyRequest = {
    id: null,
    name: "",
    description: "",
    salary: "",
    branch_office_id: null,
    department_id: null,
    job_id: null,
  };

  closeDialog(): void {
    this.isDialogOpen = false;
    this.vacancy = { ...initialVacancyData };
    (this.$refs.form as IValidationObserver).reset();
  }

  onCreate(data: IVacancy): void {
    this.isCreating = false;
    this.$emit("onCreate", data);
    this.closeDialog();
  }

  getBranchOfficesList(filters = {}): void {
    this.isLoadingBranchOfficesList = true;
    this.branchOfficeService
      .getAll(filters)
      .then((response) => {
        this.branchOfficesList = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingBranchOfficesList = false;
      });
  }

  getDepartmentList(filters = {}): void {
    this.isLoadingDepartmentList = true;
    this.departmentService
      .getAll(filters)
      .then((response) => {
        this.departmentList = response.data;
      })
      .finally(() => {
        this.isLoadingDepartmentList = false;
      });
  }

  getJobList(filters = {}): void {
    this.isLoadingJobList = true;
    this.jobService
      .getAll(filters)
      .then((response) => {
        this.jobList = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingJobList = false;
      });
  }

  createVacancy(): void {
    this.isCreating = true;
    this.vacancyService
      .create(this.vacancy)
      .then((response) => {
        this.onCreate(response.data);
      })
      .catch()
      .finally(() => {
        this.isCreating = false;
        this.closeDialog();
      });
  }

  mounted(): void {
    this.getBranchOfficesList();
    this.getDepartmentList();
    this.getJobList();
  }
}
</script>

<style scoped></style>
