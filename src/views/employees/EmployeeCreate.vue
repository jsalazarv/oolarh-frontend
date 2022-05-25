<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card class="pa-4" elevation="0">
      <v-toolbar flat>
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("employees.create.title") }}
        </v-toolbar-title>
        <v-spacer />
        <div class="d-flex align-end justify-end">
          <v-stepper elevation="0" v-model="e1" max-height="100">
            <v-stepper-header class="without-shadow stepper-header-width">
              <v-stepper-step :complete="e1 > 1" step="1" class="pa-2">
                {{ $t("employees.labels.steps.generalData") }}
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2" class="pa-2">
                {{ $t("employees.labels.steps.contactInformation") }}
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 3" step="3" class="pa-2">
                {{ $t("employees.labels.steps.employmentData") }}
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper>
        </div>
      </v-toolbar>
      <v-card-text>
        <v-stepper v-model="e1" alt-labels elevation="0">
          <v-stepper-items class="mt-5" elevation="0">
            <v-stepper-content step="1">
              <ValidationObserver ref="form" v-slot="{ invalid }">
                <GeneralDataForm />
                <v-divider class="mx-4" inset vertical></v-divider>
                <div class="d-flex justify-end">
                  <v-btn elevation="0" class="ma-1">
                    {{ $t("employees.labels.cancel") }}
                  </v-btn>
                  <v-btn
                    elevation="0"
                    class="ma-1"
                    color="primary"
                    @click="e1 = 2"
                    :disabled="invalid"
                  >
                    {{ $t("employees.labels.next") }}
                  </v-btn>
                </div>
              </ValidationObserver>
            </v-stepper-content>
            <v-stepper-content step="2">
              <ValidationObserver ref="form" v-slot="{ invalid }">
                <ContactDataForm />
                <v-divider class="mx-4" inset vertical></v-divider>
                <div class="d-flex justify-end">
                  <v-btn elevation="0" class="ma-1">
                    {{ $t("employees.labels.cancel") }}
                  </v-btn>
                  <v-btn
                    elevation="0"
                    class="ma-1"
                    color="primary"
                    @click="e1 = 1"
                  >
                    {{ $t("employees.labels.prev") }}
                  </v-btn>
                  <v-btn
                    elevation="0"
                    class="ma-1"
                    color="primary"
                    @click="e1 = 3"
                    :disabled="invalid"
                  >
                    {{ $t("employees.labels.next") }}
                  </v-btn>
                </div>
              </ValidationObserver>
            </v-stepper-content>
            <v-stepper-content step="3">
              <ValidationObserver ref="form" v-slot="{ invalid }">
                <EmploymentDataForm />
                <v-divider class="mx-4" inset vertical></v-divider>
                <div class="d-flex justify-end">
                  <v-btn elevation="0" class="ma-1">
                    {{ $t("employees.labels.cancel") }}
                  </v-btn>
                  <v-btn
                    elevation="0"
                    class="ma-1"
                    color="primary"
                    @click="e1 = 2"
                  >
                    {{ $t("employees.labels.prev") }}
                  </v-btn>
                  <v-btn
                    elevation="0"
                    class="ma-1"
                    color="success"
                    :disabled="invalid"
                  >
                    {{ $t("employees.labels.create") }}
                  </v-btn>
                </div>
              </ValidationObserver>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GeneralDataForm from "@/views/employees/components/partials/GeneralDataForm.vue";
import ContactDataForm from "@/views/employees/components/partials/ContactDataForm.vue";
import EmploymentDataForm from "@/views/employees/components/partials/EmploymentDataForm.vue";
@Component({
  components: { EmploymentDataForm, ContactDataForm, GeneralDataForm },
})
export default class EmployeeCreate extends Vue {
  public e1 = 3;
}
</script>

<style scoped lang="scss">
.without-shadow {
  box-shadow: none;
}
.stepper-header-width {
  width: 700px;
}
</style>
