<template>
  <div v-layout="'app-layout'" class="pa-4">
    <v-card elevation="0">
      <div v-if="!vacancyList.length === true">
        <NoTableData :btn-title="$t('vacancies.create.title')" />
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoTableData from "@/components/NoTableData/NoTableData.vue";
import { IVacancy } from "@/services/VacancyService/types";

@Component({
  components: { NoTableData },
})
export default class VacancyList extends Vue {
  public vacancyList: Array<IVacancy> = [];
}
</script>

<style scoped></style>
