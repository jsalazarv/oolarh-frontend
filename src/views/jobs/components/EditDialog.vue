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
          {{ $t("jobs.labels.dialogs.edit.title") }}
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
                  v-model="data.name"
                  :disabled="isEditing"
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
                  :disabled="isEditing"
                  :label="$t('jobs.attributes.description')"
                  :error-messages="errors"
                  v-model="data.description"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="light" :disabled="isEditing" @click="closeDialog">
            {{ $t("jobs.labels.dialogs.edit.actions.dismiss") }}
          </v-btn>
          <v-btn
            text
            color="success"
            type="submit"
            :loading="isEditing"
            :disabled="isEditing || invalid"
            @click="editJob"
          >
            {{ $t("jobs.labels.dialogs.edit.actions.edit") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import JobService from "@/services/JobService";
import { IJob } from "@/services/JobService/types";

@Component
export default class EditDialog extends Vue {
  protected jobService = new JobService();
  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: Object, default: {} })
  data?: IJob;
  public isEditing = false;

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  onEdit(data: IJob): void {
    this.isEditing = false;
    this.closeDialog();
    this.$emit("onEdit", data);
  }

  editJob(): void {
    this.isEditing = true;
    this.jobService
      .update(this.data as IJob)
      .then((response) => {
        this.onEdit(response.data);
      })
      .catch()
      .finally(() => {
        this.isEditing = false;
        this.closeDialog();
      });
  }
}
</script>

<style scoped></style>
