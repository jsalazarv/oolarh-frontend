<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="450"
    transition="fab-transition"
    :persistent="isEditing"
  >
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <v-card :loading="isEditing">
        <v-card-title
          class="subtitle-1 text-uppercase font-weight-regular mb-7"
        >
          {{ $t("vacancies.labels.dialogs.edit.title") }}
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
                  v-model="data.name"
                  :disabled="isEditing"
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
                  v-model="data.salary"
                  :disabled="isEditing"
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
                  :disabled="isLoadingBranchOfficesList || isEditing"
                  :loading="isLoadingBranchOfficesList"
                  :label="$t('vacancies.attributes.branch_office')"
                  :error-messages="errors"
                  v-model="data.branch_office.id"
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
                  :disabled="isLoadingDepartmentList || isEditing"
                  :loading="isLoadingDepartmentList"
                  :label="$t('vacancies.attributes.department')"
                  :error-messages="errors"
                  v-model="data.department.id"
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
                  :disabled="isLoadingJobList || isEditing"
                  :loading="isLoadingJobList"
                  :label="$t('vacancies.attributes.job')"
                  :error-messages="errors"
                  v-model="data.job.id"
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
                  v-model="data.description"
                  :disabled="isEditing"
                  :label="$t('vacancies.attributes.description')"
                  :error-messages="errors"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="light" :disabled="isEditing" @click="closeDialog">
            {{ $t("vacancies.labels.dialogs.edit.actions.dismiss") }}
          </v-btn>
          <v-btn
            text
            color="success"
            type="submit"
            :loading="isEditing"
            :disabled="isEditing || invalid"
            @click="editVacancy"
          >
            {{ $t("vacancies.labels.dialogs.edit.actions.edit") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import VacancyService from "@/services/VacancyService";
import BranchOfficesService from "@/services/BranchOfficesService";
import DepartmentService from "@/services/DepartmentService";
import JobService from "@/services/JobService";
import { IVacancy, IVacancyRequest } from "@/services/VacancyService/types";
import { IBranchOffices } from "@/services/BranchOfficesService/types";
import { IDepartment } from "@/services/DepartmentService/types";
import { IJob } from "@/services/JobService/types";

@Component
export default class EditDialog extends Vue {
  protected vacancyService = new VacancyService();
  protected branchOfficeService = new BranchOfficesService();
  protected departmentService = new DepartmentService();
  protected jobService = new JobService();

  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: Object, default: {} })
  data?: IVacancy;

  public isEditing = false;
  public isLoadingBranchOfficesList = false;
  public isLoadingDepartmentList = false;
  public isLoadingJobList = false;
  public branchOfficesList: Array<IBranchOffices> = [];
  public departmentList: Array<IDepartment> = [];
  public jobList: Array<IJob> = [];

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

  onEdit(data: IVacancy): void {
    this.isEditing = false;
    this.closeDialog();
    this.$emit("onEdit", data);
  }

  editVacancy(): void {
    this.isEditing = true;
    this.vacancy = {
      id: this.data?.id,
      name: this.data?.name,
      description: this.data?.description,
      salary: this.data?.salary,
      branch_office_id: this.data?.branch_office.id,
      department_id: this.data?.department.id,
      job_id: this.data?.job.id,
    };
    this.vacancyService
      .update(this.vacancy as IVacancyRequest)
      .then((response) => {
        this.onEdit(response.data);
      })
      .catch()
      .finally(() => {
        this.isEditing = false;
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
