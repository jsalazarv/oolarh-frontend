<template>
  <v-container
    fluid
    v-layout="'public-layout'"
    class="fill-height pa-0 back"
    :class="{ 'sign-in-active': signIn }"
  >
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-left">
          <v-card
            dark
            flat
            tile
            class="mx-auto"
            width="100%"
            color="transparent"
          >
            <v-card-title class="justify-center">POSTULARSE</v-card-title>
            <v-card-text class="text&#45;&#45;white">
              <div>Lorem ipsum dolor sit amet.</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                large
                outlined
                rounded
                color="white"
                class="invert"
                id="signIn"
                @click="signIn = !signIn"
              >
                Postularse
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="overlay-right align-center">
          <v-card
            dark
            flat
            tile
            class="mx-auto"
            width="100%"
            color="transparent"
          >
            <v-card-title class="justify-center">INICIAR SESIÓN</v-card-title>
            <v-card-text class="text&#45;&#45;white">
              <div>Lorem ipsum dolor sit amet.</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                large
                outlined
                rounded
                color="white"
                class="invert"
                id="signUp"
                @click="signIn = !signIn"
              >
                Iniciar sesión
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
    <v-row>
      <v-col cols="6">
        <div class="d-flex align-center justify-center">
          <h1>Formulario de postulantes</h1>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="d-flex align-center justify-center">
          <sign-in-form />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SignInForm from "@/views/loginOrRegister/partials/signIn/SignInForm.vue";

@Component({
  components: { SignInForm },
})
export default class LoginOrRegister extends Vue {
  public signIn = false;
}
</script>

<style lang="scss" scoped>
@import "styles";
</style>
