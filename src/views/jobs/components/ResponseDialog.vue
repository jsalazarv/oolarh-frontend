<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="650"
    transition="fab-transition"
    @click:outside="closeDialog"
  >
    <v-card>
      <v-card-title class="subtitle-1 text-uppercase font-weight-regular mb-7">
        {{ $t("jobs.labels.response") }}
      </v-card-title>
      <v-card-text class="py-0">
        <prism :plugins="['line-numbers']" :code="textCode"></prism>
      </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Watch } from "vue-property-decorator";
import Prism from "vue-prismjs";
import "prismjs/themes/prism.css";

@Component({
  components: { Prism },
})
export default class ResponseDialog extends Vue {
  @PropSync("open")
  public isDialogOpen!: boolean;
  @PropSync("response")
  data!: [];

  public code = [];

  @Watch("response")
  setData(): void {
    if (this.isDialogOpen) {
      this.code = this.data;
      console.log("code", this.code);
    }
  }

  get textCode(): string {
    return JSON.stringify(this.code, null, "\t");
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
</script>

<style scoped></style>
