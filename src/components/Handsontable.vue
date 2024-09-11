<script lang="ts" setup>
import { ref } from "vue";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import { GridSettings } from 'handsontable/settings'
import "handsontable/dist/handsontable.full.css";

// also include
/*

dates:

<script src="https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@handsontable/pikaday@1.0.0/pikaday.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@handsontable/pikaday@1.0.0/css/pikaday.min.css">


numeric:
<script src="./node_modules/numbro/dist/min/languages.min.js"></script>
import numbro from 'numbro';
import enUS from 'numbro/languages/en-US';
// register the languages you need
numbro.registerLanguage(enUS);

*/

// register Handsontable's modules
registerAllModules();

const props = defineProps<{
  data: Record<any, any>;
  licenseKey: string;
}>();

// const props = defineProps<{
//     // directus props
//     value:
//       | (number | string | Record<string, any>)[]
//       | Record<string, any>
//       | null;
//     primaryKey: string | number;
//     collection: string;
//     field: string;
//     disabled?: boolean;
//     showNavigation?: boolean;

//     // interface props
//    licenseKey: string;
//    columDefinitions: ColumnDefinitionProperties[]
// }>;

// const { value, primaryKey, collection, field, disabled, showNavigation, licenseKey, columnDefinitions } = toRefs(props);

// console.log('props', props);


const hotSettings = ref<GridSettings>({
    
});

</script>

<template>
    <hot-table :settings="hotSettings"></hot-table>
</template>
