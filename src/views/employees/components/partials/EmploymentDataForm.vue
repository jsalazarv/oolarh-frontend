<template>
  <ValidationObserver ref="form" v-slot="{ invalid }">
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-card class="px-4 py-2" elevation="0">
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
              <v-btn
                depressed
                small
                color="primary"
                @click="cancel"
                :disabled="creating"
              >
                Cancelar
              </v-btn>
              <v-btn
                depressed
                small
                color="primary"
                @click.prevent="goBack"
                :disabled="creating"
              >
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
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Emit, Prop, PropSync, Vue } from "vue-property-decorator";
import { IEmployeeRequest } from "@/services/EmployeeService/types";
import NoTableData from "@/components/NoTableData/NoTableData.vue";
import VacancyListDialog from "@/components/VacancyList/VacancyListDialog.vue";
import VacancySelector from "@/components/VacancySelector/VacancySelector.vue";

const initEmployeeData = {
  salary: "",
  psychometric_test: "",
};

@Component({
  components: { VacancySelector, VacancyListDialog, NoTableData },
})
export default class EmploymentDataForm extends Vue {
  @PropSync("data", { type: Object, default: {} })
  employee?: Partial<IEmployeeRequest>;

  @PropSync("isCreating", { default: false })
  public creating!: boolean;

  @Prop({ default: true })
  public clearable!: boolean;

  @Emit("submit")
  submit(): Partial<IEmployeeRequest> {
    return this.employee as Partial<IEmployeeRequest>;
  }

  @Emit("clear")
  clear(): Partial<IEmployeeRequest> {
    this.employee = initEmployeeData;
    return this.employee;
  }

  cancel(): void {
    if (this.clearable) {
      this.clear();
    }
  }

  goBack(): void {
    this.$emit("back");
  }
}
</script>

<style scoped></style>
