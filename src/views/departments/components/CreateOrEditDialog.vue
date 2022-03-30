<template>
  <v-dialog v-model="isDialogOpen" max-width="450">
    <v-card>
      <v-card-title class="subtitle-2 text-uppercase mb-7">
        {{ $t("departments.attributes.createDepartment") }}
      </v-card-title>
      <v-card-text class="py-0">
        <v-row>
          <v-col class="py-0" cols="12">
            <v-text-field
              autocomplete="off"
              dense
              name="name"
              :label="$t('departments.attributes.name')"
              outlined
              required
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="light darken-1" text @click="closeDialog">
          {{ $t("departments.labels.dialogs.create.actions.dismiss") }}
        </v-btn>
        <v-btn color="success">
          {{ $t("departments.labels.dialogs.create.actions.create") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";

@Component({})
export default class CreationDialog extends Vue {
  @PropSync("open")
  public isDialogOpen!: boolean;

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
</script>

<style scoped></style>
