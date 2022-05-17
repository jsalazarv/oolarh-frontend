<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card elevation="0">
      <div v-if="!applicantList.length === true">
        <NoTableData
          @onRecord="redirectToCreation"
          :btn-title="$t('applications.create.title')"
        />
      </div>
      <v-toolbar flat v-if="!applicantList.length === false">
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("applications.list.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="success"
          :to="{ name: 'application:create' }"
          :disabled="isLoadingApplicantList"
        >
          {{ $t("applications.labels.create") }}
        </v-btn>
      </v-toolbar>
      <v-data-table
        class="elevation-0 mt-5"
        :headers="headers"
        :loading="isLoadingApplicantList"
        :items="applicantList"
        :page.sync="pagination.current_page"
        :items-per-page="pagination.per_page"
        hide-default-footer
        @page-count="pageCount = $event"
        v-if="!applicantList.length === false"
      >
        <template v-slot:[`item.psychometric_test`]="{ item }">
          <a
            class="text-decoration-none"
            target="_blank"
            :href="item.psychometric_test"
          >
            {{ $t("applications.labels.showPsychometricTest") }}
          </a>
        </template>
        <template v-slot:[`item.resume`]="{ item }">
          <a
            class="text-decoration-none"
            target="_blank"
            :href="item.resume.url"
          >
            {{ $t("applications.labels.showResume") }}
          </a>
        </template>
        <template v-slot:[`item.status`]="{ item, index }">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                rounded
                elevation="0"
                v-bind="attrs"
                v-on="on"
                class="white--text text-sm-caption"
                height="24px"
                :id="item"
                :color="statuses[item.status].color"
                :loading="item.isLoading"
                :disabled="item.status === 'accepted'"
              >
                {{ statuses[item.status].text }}
                <v-icon right dark> mdi-triangle-small-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(state, stateIndex) in items"
                :key="stateIndex"
                @click="selectedState(index, state.status, item)"
                :value="item.status"
              >
                <v-list-item-title>{{ state.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            class="mx-1"
            color="primary"
            x-small
            fab
            :to="{ name: 'application:edit', params: { id: item.id } }"
          >
            <v-icon dark>mdi-account-edit</v-icon>
          </v-btn>
          <v-btn
            class="mx-1"
            color="primary"
            x-small
            fab
            disabled
            @click="editDialog(item)"
          >
            <v-icon dark>mdi-account-eye</v-icon>
          </v-btn>
          <v-btn
            class="mx-1"
            color="error"
            x-small
            fab
            @click="deleteDialog(item)"
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-pagination
        v-model="pagination.current_page"
        v-if="!applicantList.length === false"
        :length="pagination.last_page"
        @input="search"
      ></v-pagination>
    </v-card>
    <DeleteDialog
      :open.sync="openDeleteDialog"
      :data="applicant"
      @onDelete="updateListAfterDelete"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApplicantService from "@/services/ApplicantService";
import {
  IApplicant,
  IApplicantQueryParams,
  IIsLoading,
  IStatuses,
  IStatusListItem,
} from "@/services/ApplicantService/types";
import { IHeaders, IMeta } from "@/services/types";
import DeleteDialog from "@/views/applications/components/DeleteDialog.vue";
import NoTableData from "@/components/NoTableData/NoTableData.vue";

@Component({
  components: { NoTableData, DeleteDialog },
})
export default class ApplicationList extends Vue {
  protected applicantService = new ApplicantService();
  public applicantList: Array<IIsLoading> = [];
  public isLoadingApplicantList = false;
  public openDeleteDialog = false;
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
  public statuses: IStatuses = {
    postulate: {
      text: this.$t("applications.labels.postulate") as string,
      color: "blue-grey",
    },
    processing: {
      text: this.$t("applications.labels.inProcess") as string,
      color: "orange",
    },
    refused: {
      text: this.$t("applications.labels.refused") as string,
      color: "error",
    },
    accepted: {
      text: this.$t("applications.labels.accepted") as string,
      color: "success",
    },
  };

  get headers(): Array<IHeaders> {
    return [
      {
        text: this.$t("applications.attributes.id") as string,
        value: "id",
        sortable: false,
      },
      {
        text: this.$t("applications.attributes.name") as string,
        value: "fullName",
        sortable: false,
      },
      {
        text: this.$t("applications.attributes.email") as string,
        value: "email",
        sortable: false,
      },
      {
        text: this.$t("applications.attributes.cellphone") as string,
        value: "cellphone",
        sortable: false,
      },
      {
        text: this.$t("applications.attributes.psychometric_test") as string,
        value: "psychometric_test",
        sortable: false,
      },
      {
        text: this.$t("applications.attributes.resume") as string,
        value: "resume",
        sortable: false,
      },
      {
        text: this.$t("applications.attributes.status") as string,
        value: "status",
        sortable: false,
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ];
  }

  get items(): Array<IStatusListItem> {
    let statuses: Array<IStatusListItem> = [];
    return Object.entries(this.statuses).reduce((carry, item) => {
      const [status, value] = item;
      carry.push({ status, text: value.text });
      return carry;
    }, statuses);
  }

  get filters(): IApplicantQueryParams {
    return {
      ...this.params,
      page: this.pagination.current_page,
      per_page: this.pagination.per_page,
    };
  }

  redirectToCreation(): void {
    this.$router.push({
      name: "application:create",
    });
  }

  search(): void {
    this.getApplicantList(this.filters);
  }

  getApplicantList(filters = {}): void {
    this.isLoadingApplicantList = true;
    this.applicantService
      .getAll(filters)
      .then((response) => {
        this.applicantList = response.data;
        this.pagination = response.meta;
      })
      .catch()
      .finally(() => {
        this.isLoadingApplicantList = false;
      });
  }

  deleteDialog(item: IApplicant): void {
    this.openDeleteDialog = true;
    this.applicant = item;
  }

  updateListAfterDelete(data: IApplicant): void {
    let index = this.applicantList.indexOf(data);
    this.applicantList.splice(index, 1);
  }

  editApplicant(index: number, status: string, data: IApplicant): void {
    this.applicantList[index].isLoading = true;
    this.applicantService
      .update(data.id, { status })
      .then((response) => {
        data.status = response.data.status;
        if (data.status === "accepted") {
          this.$router.push({
            name: "employees:list",
          });
        }
      })
      .catch()
      .finally(() => {
        const newList = [...this.applicantList];
        newList[index].isLoading = false;
        this.applicantList = newList;
      });
  }

  selectedState(index: number, status: string, data: IApplicant): void {
    this.editApplicant(index, status, data);
  }

  mounted(): void {
    this.search();
  }
}
</script>

<style scoped></style>
