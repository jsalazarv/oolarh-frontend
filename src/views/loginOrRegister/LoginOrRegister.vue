<template>
  <v-container
    fluid
    v-layout="'public-layout'"
    class="fill-height pa-0 back"
    :class="{ 'sign-in-active': signIn }"
  >
    <v-row>
      <v-col cols="12" md="6" class="login-col">
        <div class="overlay">
          <div class="d-flex align-center justify-center"></div>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="login-col">
        <v-card height="100%" class="d-flex align-center justify-center py-10">
          <sign-in-form />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SignInForm from "@/views/loginOrRegister/partials/signIn/SignInForm.vue";
import SignUpForm from "@/views/loginOrRegister/partials/signUp/SignUpForm.vue";

@Component({
  components: { SignUpForm, SignInForm },
})
export default class LoginOrRegister extends Vue {
  public signIn = true;
}
</script>

<style lang="scss" scoped>
@import "styles";
</style>
