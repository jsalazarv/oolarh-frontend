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
          {{ $t("departments.labels.dialogs.edit.title") }}
        </v-card-title>
        <v-card-text class="py-0">
          <v-row>
            <v-col class="py-0" cols="12">
              <ValidationProvider
                :name="$t('departments.attributes.name')"
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
                  :label="$t('departments.attributes.name')"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="light" :disabled="isEditing" @click="closeDialog">
            {{ $t("departments.labels.dialogs.edit.actions.dismiss") }}
          </v-btn>
          <v-btn
            text
            color="success"
            type="submit"
            :loading="isEditing"
            :disabled="isEditing || invalid"
            @click="editDepartment"
          >
            {{ $t("departments.labels.dialogs.edit.actions.edit") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import DepartmentService from "@/services/DepartmentService";
import { IDepartment } from "@/services/DepartmentService/types";

@Component({})
export default class EditDialog extends Vue {
  protected departmentService = new DepartmentService();
  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: Object, default: {} })
  data?: IDepartment;
  public isEditing = false;

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  editDepartment(): void {
    this.isEditing = true;
    this.departmentService
      .update(this.data as IDepartment)
      .then((response) => {
        console.log(response);
      })
      .catch()
      .finally(() => {
        this.isEditing = true;
        this.closeDialog();
      });
  }
}
</script>

<style scoped></style>
