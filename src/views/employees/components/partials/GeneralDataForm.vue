<template>
  <ValidationObserver ref="form" v-slot="{ invalid }">
    <v-container fluid class="pa-0">
      <v-card class="px-4 py-2" elevation="0">
        <v-row>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.name')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                dense
                outlined
                required
                autocomplete="off"
                name="name"
                :label="$t('employees.attributes.name')"
                :loading="loading"
                :disabled="loading"
                :error-messages="errors"
                v-model="employee.names"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.first_surname')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                dense
                outlined
                required
                autocomplete="off"
                name="first_surname"
                :loading="loading"
                :disabled="loading"
                :label="$t('employees.attributes.first_surname')"
                :error-messages="errors"
                v-model="employee.first_surname"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.second_surname')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                dense
                outlined
                required
                autocomplete="off"
                name="second_surname"
                :loading="loading"
                :disabled="loading"
                :label="$t('employees.attributes.second_surname')"
                :error-messages="errors"
                v-model="employee.second_surname"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.birthday')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                dense
                outlined
                required
                autocomplete="off"
                name="birthday"
                :loading="loading"
                :disabled="loading"
                :label="$t('employees.attributes.birthday')"
                :error-messages="errors"
                v-model="employee.birthday"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.gender')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-autocomplete
                dense
                outlined
                required
                autocomplete="off"
                name="gender"
                :label="$t('employees.attributes.gender')"
                :loading="isLoadingGenderList || loading"
                :disabled="isLoadingGenderList || loading"
                :error-messages="errors"
                :items="genders"
                item-text="name"
                item-value="name"
                v-model="employee.gender"
              ></v-autocomplete>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.rfc')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                dense
                outlined
                required
                autocomplete="off"
                name="rfc"
                :loading="loading"
                :disabled="loading"
                :label="$t('employees.attributes.rfc')"
                :error-messages="errors"
                v-model="employee.rfc"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.ssn')"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                dense
                outlined
                required
                autocomplete="off"
                name="ssn"
                :loading="loading"
                :disabled="loading"
                :label="$t('employees.attributes.ssn')"
                :error-messages="errors"
                v-model="employee.ssn"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              :name="$t('employees.attributes.resume')"
              rules="required"
            >
              <CustomFileInput
                :file-name="fileName"
                :is-loading="loading"
                :is-disabled="loading"
                @onFileChanged="updateFileValue"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-card-actions class="white">
          <v-spacer />
          <v-btn depressed small color="primary" @click="cancel">
            Cancelar
          </v-btn>
          <v-btn
            depressed
            small
            color="primary"
            @click.prevent="submit"
            :disabled="invalid"
          >
            <v-icon dark> mdi-chevron-right </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Emit, Prop, PropSync, Vue } from "vue-property-decorator";
import GenderService from "@/services/GenderService";
import { IEmployeeRequest, IResume } from "@/services/EmployeeService/types";
import { IGender } from "@/services/GenderService/types";
import CustomFileInput from "@/views/applications/components/CustomFileInput.vue";

const initEmployeeData = {
  names: "",
  first_surname: "",
  second_surname: "",
  birthday: "",
  gender: "",
  rfc: "",
  ssn: "",
  resume: null,
};
@Component({
  components: { CustomFileInput },
})
export default class GeneralDataForm extends Vue {
  protected genderService = new GenderService();
  public genders: Array<IGender> = [];
  public isLoadingGenderList = false;

  @PropSync("data", { type: Object, default: {} })
  employee!: Partial<IEmployeeRequest>;

  @PropSync("isLoading", { default: false })
  public loading!: boolean;

  @Prop({ default: true })
  public clearable!: boolean;

  getGenders(): void {
    this.isLoadingGenderList = true;
    this.genderService
      .getAll()
      .then((response) => {
        this.genders = response.data;
      })
      .catch()
      .finally(() => {
        this.isLoadingGenderList = false;
      });
  }

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

  get fileName(): Partial<IResume> {
    return this.employee.resume?.file_name;
  }

  updateFileValue(data: File): void {
    this.employee.resume = data;
  }

  mounted(): void {
    this.getGenders();
  }
}
</script>

<style scoped></style>
