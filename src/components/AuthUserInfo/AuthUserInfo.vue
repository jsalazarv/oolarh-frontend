<template>
  <v-menu offset-y top max-width="280" class="align-start">
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" />
        </v-list-item-avatar>
      </div>
    </template>
    <v-card tile>
      <v-list class="pt-0">
        <v-list-item class="py-0 rounded-bl-xl primary" color="primary">
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              Snoop Dogg
            </v-list-item-title>
            <v-list-item-subtitle class="white--text">
              snoop.dogg@oolaa.com
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Logout </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-title class="text-right">
            <v-btn-toggle
              mandatory
              shaped
              color="primary"
              class="text--white"
              v-model="currentLang"
            >
              <v-btn
                small
                v-for="idiom in languages"
                :key="idiom.flag"
                :value="idiom.flag"
                @click="changeLocal(idiom.flag)"
              >
                {{ idiom.flag }}
              </v-btn>
            </v-btn-toggle>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AuthService from "@/services/AuthService";
import { ILanguage } from "@/services/types";

@Component
export default class AuthUserInfo extends Vue {
  protected authService = new AuthService();

  @Prop({
    type: Array,
    default: () => [
      {
        flag: "es",
        name: "Español",
        img: "/mexico.png",
      },
      {
        flag: "en",
        name: "Inglés",
        img: "/united-states.png",
      },
    ],
  })
  public languages?: Array<ILanguage>;
  public currentLang = this.$store.state.app.lang;

  changeLocal(lang: string): void {
    this.$store.dispatch("app/changeLanguage", lang);
  }

  logout(): void {
    this.authService
      .logout()
      .then(() => {
        this.$store.dispatch("auth/resetAccess");
        this.$router.push({ name: "login" });
      })
      .catch()
      .finally();
  }
}
</script>

<style scoped lang="scss"></style>
