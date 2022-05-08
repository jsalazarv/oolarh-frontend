<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card elevation="0">
      <div v-if="!jobList.length === true">
        <NoTableData
          @onRecord="createDialog"
          :btn-title="$t('jobs.create.title')"
        />
      </div>

      <v-toolbar flat v-if="!jobList.length === false">
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("jobs.list.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="success"
          v-if="!jobList.length === false"
          :disabled="isLoadingJobList"
          @click="createDialog"
        >
          {{ $t("jobs.labels.create") }}
        </v-btn>
      </v-toolbar>

      <v-data-table
        v-if="!jobList.length === false"
        class="elevation-0 mt-5"
        :headers="headers"
        :items="jobList"
        :loading="isLoadingJobList"
        :page.sync="pagination.current_page"
        :items-per-page="pagination.per_page"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            class="mx-1"
            color="primary"
            x-small
            fab
            @click="editDialog(item)"
            disabled
          >
            <v-icon dark>mdi-account-edit</v-icon>
          </v-btn>
          <v-btn
            class="mx-1"
            color="error"
            x-small
            fab
            @click="deleteDialog(item)"
            disabled
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <CreateDialog
      :open.sync="openCreateDialog"
      @onCreate="updateListAfterCreate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import JobService from "@/services/JobService";
import { IJob, IJobQueryParams } from "@/services/JobService/types";
import NoTableData from "@/components/NoTableData/NoTableData.vue";
import { IHeaders, IMeta } from "@/services/types";
import CreateDialog from "@/views/jobs/components/CreateDialog.vue";

@Component({
  components: { CreateDialog, NoTableData },
})
export default class JobList extends Vue {
  protected jobService = new JobService();
  public jobList: Array<IJob> = [];
  public isLoadingJobList = false;
  public openCreateDialog = false;
  public params = {
    query: "",
  };

  public pagination: IMeta = {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 10,
    to: 1,
    total: 0,
  };

  get headers(): Array<IHeaders> {
    return [
      {
        text: this.$t("jobs.attributes.id") as string,
        value: "id",
        sortable: false,
      },
      {
        text: this.$t("jobs.attributes.name") as string,
        value: "name",
        sortable: false,
      },
      {
        text: this.$t("jobs.attributes.description") as string,
        value: "description",
        sortable: false,
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ];
  }

  get filters(): IJobQueryParams {
    return {
      ...this.params,
      page: this.pagination.current_page,
      per_page: this.pagination.per_page,
    };
  }

  search(): void {
    this.getJobList(this.filters);
  }

  getJobList(filters = {}): void {
    this.jobService
      .getAll(filters)
      .then((response) => {
        this.jobList = response.data;
      })
      .catch()
      .finally();
  }

  createDialog(): void {
    this.openCreateDialog = true;
  }

  editDialog(item: IJob): void {
    console.log("EDIT JOB", item);
  }

  deleteDialog(item: IJob): void {
    console.log("DELETE JOB", item);
  }

  updateListAfterCreate(data: IJob): void {
    this.jobList.push(data);
  }

  mounted(): void {
    this.search();
  }
}
</script>

<style scoped></style>
