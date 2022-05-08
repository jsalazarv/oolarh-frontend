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
          {{ $t("jobs.labels.dialogs.create.title") }}
        </v-card-title>
        <v-card-text class="py-0">
          <v-row>
            <v-col class="py-0" cols="12">
              <ValidationProvider
                :name="$t('jobs.attributes.name')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  dense
                  outlined
                  required
                  autocomplete="off"
                  name="name"
                  v-model="job.name"
                  :disabled="isCreating"
                  :label="$t('jobs.attributes.name')"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col class="py-0" cols="12">
              <ValidationProvider
                :name="$t('jobs.attributes.description')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-textarea
                  dense
                  outlined
                  required
                  auto-grow
                  autocomplete="off"
                  name="name"
                  rows="5"
                  row-height="15"
                  :disabled="isCreating"
                  :label="$t('jobs.attributes.description')"
                  :error-messages="errors"
                  v-model="job.description"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="light" :disabled="isCreating" @click="closeDialog">
            {{ $t("jobs.labels.dialogs.create.actions.dismiss") }}
          </v-btn>
          <v-btn
            text
            color="success"
            type="submit"
            :loading="isCreating"
            :disabled="isCreating || invalid"
            @click="createJob"
          >
            {{ $t("jobs.labels.dialogs.create.actions.create") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import JobService from "@/services/JobService";
import { IJob } from "@/services/JobService/types";
import { IValidationObserver } from "@/components/types";

const initialJobData: IJob = {
  id: null,
  name: "",
  description: "",
};

@Component
export default class CreateDialog extends Vue {
  protected jobService = new JobService();
  @PropSync("open")
  public isDialogOpen!: boolean;
  public isCreating = false;
  public job: IJob = {
    id: null,
    name: "",
    description: "",
  };

  closeDialog(): void {
    this.isDialogOpen = false;
    this.job = { ...initialJobData };
    (this.$refs.form as IValidationObserver).reset();
  }

  onCreate(data: IJob): void {
    this.isCreating = false;
    this.$emit("onCreate", data);
    this.closeDialog();
  }

  createJob(): void {
    this.isCreating = true;
    this.jobService
      .create(this.job)
      .then((response) => {
        this.onCreate(response.data);
      })
      .catch()
      .finally(() => {
        this.isCreating = false;
        this.closeDialog();
      });
  }
}
</script>

<style scoped></style>
