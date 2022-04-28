<template>
  <ValidationObserver ref="form" v-slot="{ invalid }">
    <v-card
      flat
      tile
      class="mx-auto"
      width="450"
      color="transparent"
      :loading="isAuthenticating"
    >
      <div class="d-flex flex-column align-center mb-7">
        <v-img
          class="d-flex justify-center align-center"
          src="/imagotype-dark.svg"
          width="200"
        ></v-img>
      </div>
      <v-card-title class="justify-center">INICIAR SESIÓN</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              name="user"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                outlined
                dense
                required
                autocomplete="off"
                name="user"
                label="Usuario"
                v-model="authData.email"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              name="password"
              rules="required|min:6"
              v-slot="{ errors }"
            >
              <v-text-field
                outlined
                dense
                required
                autocomplete="off"
                name="password"
                label="Password"
                v-model="authData.password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="errors"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          large
          outlined
          rounded
          color="primary"
          class="px-10"
          type="submit"
          :disabled="invalid || isAuthenticating"
          @click="login"
        >
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IValidationObserver } from "@/components/types";
import AuthService from "@/services/AuthService";

@Component({})
export default class SignInForm extends Vue {
  /*public user = "";
  public password = "";
  public showPassword = false;
  public error = "";
  public alert = false;

  async login(): Promise<void> {
    if (await (this.$refs.form as IValidationObserver).validate()) {
      this.$store
        .dispatch("user/login", {
          user: this.user,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "dashboard" });
        })
        .catch(() => {
          this.error = "Error interno, Favor de verificar";
          this.alert = true;
        })
        .finally(() => {
          //TODO: Actions
        });
    }
  }*/
  protected authService = new AuthService();
  public isAuthenticating = false;
  public authData = {
    email: "root@oolaa.com",
    password: "secret",
  };
  public user = [];
  public showPassword = false;

  async login(): Promise<void> {
    this.isAuthenticating = true;
    if (await (this.$refs.form as IValidationObserver).validate()) {
      this.authService
        .login(this.authData)
        .then((response) => {
          this.$store.dispatch("auth/authenticate", response);
          this.$router.push({ name: "dashboard" });
        })
        .catch()
        .finally(() => {
          this.isAuthenticating = false;
        });
    }
  }
}
</script>

<style scoped></style>
