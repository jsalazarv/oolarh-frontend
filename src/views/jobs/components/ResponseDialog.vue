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
      <v-card-actions>
        <v-btn @click="changeFormat">{{ inverseFormat }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Watch } from "vue-property-decorator";
import Prism from "vue-prismjs";
import "prismjs/themes/prism.css";
import * as js2xmlparser from "js2xmlparser";

type Formats = "json" | "xml";

@Component({
  components: { Prism },
})
export default class ResponseDialog extends Vue {
  @PropSync("open")
  public isDialogOpen!: boolean;
  @PropSync("response")
  data!: [];

  public code = [];
  public format: Formats = "json";

  @Watch("response")
  setData(): void {
    if (this.isDialogOpen) {
      this.code = this.data;
    }
  }

  changeFormat(): void {
    this.format = this.inverseFormat;
  }

  get inverseFormat(): Formats {
    return this.format === "xml" ? "json" : "xml";
  }

  get textCode(): string {
    if (this.format === "json") {
      return JSON.stringify(this.code, null, "\t");
    }

    return js2xmlparser.parse("text", this.code);
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
</script>

<style scoped></style>
