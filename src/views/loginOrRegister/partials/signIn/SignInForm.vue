<template>
  <v-card flat tile class="mx-auto" width="450" color="transparent">
    <v-card-title class="justify-center">INICIAR SESIÓN</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            outlined
            dense
            autocomplete="off"
            name="email"
            label="Email"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            autocomplete="off"
            name="password"
            label="Password"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn large outlined rounded color="primary" class="px-10">
        Entrar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class SignInForm extends Vue {}
</script>

<style scoped></style>
