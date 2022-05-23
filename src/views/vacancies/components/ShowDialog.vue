<template>
  <v-dialog v-model="isDialogOpen" max-width="450" transition="fab-transition">
    <VacancySelector
      :data="data"
      :is-loading="isLoading"
      :is-disabled="isLoading"
      :is-it-selectable="false"
    />
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { IVacancy } from "@/services/VacancyService/types";
import VacancySelector from "@/components/VacancySelector/VacancySelector.vue";
@Component({
  components: { VacancySelector },
})
export default class ShowDialog extends Vue {
  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: Object, default: {} })
  data?: IVacancy;

  public isLoading = false;

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
</script>

<style scoped></style>
