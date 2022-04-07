<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="450"
    transition="fab-transition"
    :persistent="isCreating"
  >
    <ValidationObserver ref="formCreate" v-slot="{ invalid }">
      <v-card :loading="isCreating">
        <v-card-title
          class="subtitle-1 text-uppercase font-weight-regular mb-7"
        >
          {{ $t("departments.labels.dialogs.create.title") }}
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
                  v-model="department.name"
                  :disabled="isCreating"
                  :label="$t('departments.attributes.name')"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="light" :disabled="isCreating" @click="closeDialog">
            {{ $t("departments.labels.dialogs.create.actions.dismiss") }}
          </v-btn>
          <v-btn
            text
            color="success"
            type="submit"
            :loading="isCreating"
            :disabled="isCreating || invalid"
            @click="createDepartment"
          >
            {{ $t("departments.labels.dialogs.create.actions.create") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import DepartmentService from "@/services/DepartmentService";
import { IDepartment } from "@/services/DepartmentService/types";

@Component({})
export default class CreationDialog extends Vue {
  protected departmentService = new DepartmentService();

  @PropSync("open")
  public isDialogOpen!: boolean;

  public isCreating = false;
  public department: IDepartment = {
    id: null,
    name: "",
  };

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  onCreate(data: IDepartment): void {
    this.isCreating = false;
    this.closeDialog();
    this.$emit("onCreate", data);
  }

  createDepartment(): void {
    this.isCreating = true;
    this.departmentService
      .create(this.department)
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
