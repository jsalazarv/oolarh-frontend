<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class PublicLayout extends Vue {}
</script>

<style scoped></style>
