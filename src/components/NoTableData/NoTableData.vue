<template>
  <v-col cols="12">
    <div class="d-flex justify-center">
      <div class="ma-10">
        <figure class="d-flex justify-center">
          <img src="/vertical-imagotype-white-and-grey.svg" alt="" />
        </figure>
        <div class="d-flex justify-center mt-10">
          <v-btn
            class="blue-grey--text"
            color="baseGrey"
            elevation="0"
            height="50"
            @click="onRecord"
          >
            {{ btnTitle || $t("dictionary.createRecord") }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NoTableData extends Vue {
  @Prop({
    type: String,
    default: "",
  })
  public btnTitle?: string;

  onRecord(): void {
    this.$emit("onRecord");
  }
}
</script>

<style scoped></style>
