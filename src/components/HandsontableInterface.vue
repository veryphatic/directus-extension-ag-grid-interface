<script lang="ts" setup>
import { toRefs } from "vue";
import { ColumnDefinitionProperties } from "./../types";

// const props = defineProps<{
//   value: Record<string, string | number>[];
//   primaryKey: string | number;
//   collection: string;

//   // interface props
//   columns: ColumnDefinitionProperties[];
//   licenseKey: string;
//   generateFromSelect?: string; // use the generated key from the header
// }>();

const props = defineProps<{
  // directus props
  value: (number | string | Record<string, any>)[] | Record<string, any> | null;
  primaryKey: string | number;
  collection: string;
  field: string;
  disabled?: boolean;
  showNavigation?: boolean;

  // interface props
  licenseKey: string;
  columDefinitions: ColumnDefinitionProperties[];
}>();

const {
  value,
  primaryKey,
  collection,
  field,
  disabled,
  showNavigation,
  licenseKey,
  columnDefinitions,
} = toRefs(props);


console.log("Hansontable: props", props);
</script>

<template>
  <p>Test</p>
</template>
