<template>
  <v-card flat tile class="mx-auto" width="450" color="transparent">
    <div class="d-flex flex-column align-center mb-7">
      <v-img
        class="d-flex justify-center align-center"
        src="/imagotype-dark.svg"
        width="200"
      ></v-img>
    </div>
    <v-card-title class="justify-center">POSTULARSE</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            outlined
            dense
            autocomplete="off"
            name="name"
            label="Nombre"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            autocomplete="off"
            name="lastname"
            label="Apellido"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn large outlined rounded color="primary" class="px-10">
        Enviar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class SignUpForm extends Vue {}
</script>

<style scoped></style>
