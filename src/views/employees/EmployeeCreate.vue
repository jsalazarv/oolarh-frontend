<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card class="pa-4" elevation="0">
      <v-toolbar flat>
        <v-toolbar-title class="subtitle-1 text-uppercase">
          {{ $t("employees.create.title") }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-stepper v-model="e1" alt-labels elevation="0">
          <div class="d-flex justify-center">
            <v-stepper-header class="without-shadow stepper-header-width">
              <v-stepper-step :complete="e1 > 1" step="1">
                {{ $t("employees.labels.steps.generalData") }}
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">
                {{ $t("employees.labels.steps.contactInformation") }}
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 3" step="3">
                {{ $t("employees.labels.steps.employmentData") }}
              </v-stepper-step>
            </v-stepper-header>
          </div>

          <v-stepper-items class="mt-5" elevation="0">
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
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GeneralDataForm from "@/views/employees/components/partials/GeneralDataForm.vue";
@Component({
  components: { GeneralDataForm },
})
export default class EmployeeCreate extends Vue {
  public e1 = 1;
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
