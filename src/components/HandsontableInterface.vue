<script lang="ts" setup>
import { ColumnDefinitionProperties } from "./../types";

const props = defineProps<{
  value: Record<string, string | number>[];
  primaryKey: string | number;
  collection: string;

  // interface props
  columns: ColumnDefinitionProperties[];
  licenseKey: string;
  generateFromSelect?: string; // use the generated key from the header
}>();

console.log("Hansontable: props", props);
</script>

<template>
  <p>Test</p>
</template>
