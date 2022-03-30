<template>
  <v-dialog v-model="isDialogOpen" max-width="450">
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <v-card>
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
                  v-model="name"
                  :label="$t('departments.attributes.name')"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="light" @click="closeDialog">
            {{ $t("departments.labels.dialogs.create.actions.dismiss") }}
          </v-btn>
          <v-btn text color="success" type="submit" :disabled="invalid">
            {{ $t("departments.labels.dialogs.create.actions.create") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";

@Component({})
export default class CreationDialog extends Vue {
  @PropSync("open")
  public isDialogOpen!: boolean;

  public name = "";

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
</script>

<style scoped></style>
