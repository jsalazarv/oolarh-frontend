<template>
  <div>
    <v-text-field
      ref="fileInputShow"
      outlined
      dense
      required
      readonly
      autocomplete="off"
      prepend-icon=""
      prepend-inner-icon="mdi-file-account"
      name="psychometric_test"
      :label="$t('applications.attributes.resume')"
      :loading="loading"
      :disabled="disabled"
      v-model="displayFileName"
      @click="onInputClick"
    ></v-text-field>
    <input
      ref="fileInput"
      hidden
      type="file"
      accept=".pdf"
      @change="onFileChanged"
    />
  </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";

@Component
export default class CustomFileInput extends Vue {
  @PropSync("fileName", { type: String, default: "" })
  currentFileName!: string;

  @PropSync("isDisabled", { type: Boolean, default: false })
  disabled!: false;

  @PropSync("isLoading", { type: Boolean, default: false })
  loading!: false;

  public selectedFile: File | null = null;
  public isSelecting = false;

  get displayFileName(): string {
    return this.selectedFile ? this.selectedFile.name : this.currentFileName;
  }

  onInputClick(): void {
    this.isSelecting = true;
    window.addEventListener(
      "focus",
      () => {
        this.isSelecting = false;
      },
      { once: true }
    );

    (this.$refs.fileInput as HTMLElement).click();
  }

  onFileChanged(e: Event): void {
    const fileList = (e.target as HTMLInputElement).files;
    this.selectedFile = fileList ? fileList[0] : null;
    this.$emit("onFileChanged", this.selectedFile);
  }
}
</script>

<style scoped></style>
