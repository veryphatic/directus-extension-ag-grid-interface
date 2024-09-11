<script lang="ts" setup>
import { ref, toRaw, toRefs } from "vue";
import { ColumnDefinitionProperties } from "../types";
import ColumnDefinitionEditorDrawer from "./ColumnDefinitionEditorDrawer.vue";
import {  } from "ag-grid-vue3";

/**
 * InterfaceOptions
 * This is the component used to build the AG-Grid grid configurations:
 * - column definitions
 * - grid options
 */

const props = defineProps<{
  value: Record<string, any> | null;
  collection: string;
}>();

console.log("props ...", toRaw(props));

const { value, collection } = toRefs(props);

const emit = defineEmits<{
  (e: "input", value: Record<string, any> | null): void;
}>();

const licenceKey = ref<string>(value.value?.licenceKey ?? "");
const columDefinitions = ref<ColumnDefinitionProperties[]>(
  value.value?.columDefinitions ?? [],
);
const selectedColumnDefinition = ref<Partial<ColumnDefinitionProperties> | undefined>(undefined);
const selectedColumnDefinitionIndex = ref<number | null>(null);

const columnDefinitionEditorOpen = ref<boolean>(false);
console.log("initial columDefinitions", columDefinitions.value);
// const generateFromSelect = ref<string>();

const addColumnDefinition = () => {
  selectedColumnDefinition.value = undefined;
  columnDefinitionEditorOpen.value = true;
};

const onUpdateColumnDefinition = (update: ColumnDefinitionProperties) => {
  // selectedColumnDefinition.value = undefined;
  // set the `columnDefinitions` property with the correct index or new item
  if (selectedColumnDefinitionIndex.value === null) {
    console.log("null index:: create new");
    columDefinitions.value = [...columDefinitions.value, update];
  } else {
    console.log("match index", selectedColumnDefinitionIndex.value, columDefinitions.value);
    columDefinitions.value = columDefinitions.value.map((def, idx) => {
      console.log('idx--selectedIdx', idx, selectedColumnDefinitionIndex.value, idx = selectedColumnDefinitionIndex.value, typeof idx, typeof selectedColumnDefinitionIndex.value)
      if (idx === selectedColumnDefinitionIndex.value) {
        console.log('match::::', update)
        return update;
      }
      console.log('no match:::')
      return def;
    })
  }
  console.log("update to column setting", update);
  console.log("updated columDefinitions", columDefinitions.value);
  emitUpdate();
};

const onCloseColumnDefinition = () => {
  columnDefinitionEditorOpen.value = false;
  selectedColumnDefinition.value = undefined;
  selectedColumnDefinitionIndex.value = null;
};

const onDeleteColumnDefinition = (idx: number) => {
  console.log("delete index", idx);
  // columDefinitions.value = { ...columDefinitions.value.splice(idx,1) }
  columDefinitions.value.splice(idx,1);
  console.log('deleted::updated columnDefinition', columDefinitions.value)
  emitUpdate();
};

const onEditDefinition = (idx: number) => {
  console.log('edit definition', idx);
  selectedColumnDefinitionIndex.value = idx;
  selectedColumnDefinition.value = { ...columDefinitions.value[idx] }
  columnDefinitionEditorOpen.value = true;
}

const emitUpdate = () => {
  console.log("emit update", licenceKey.value);
  emit("input", {
    licenceKey: licenceKey.value,
    columDefinitions: columDefinitions.value,
  });
};
</script>

<template>
  <div class="form">
    <!-- <div class="field">
      <div class="label type-label">
        Handsontable Licence Key
        <span class="required">
          <v-icon name="star" filled sup />
        </span>
      </div>
      <v-input v-model="licenceKey" @update:modelValue="emitUpdate" />
      <small>
        Handsontable is licenced software.
        <a href="https://handsontable.com/" target="_blank">
          Get Handsontable here
        </a>
      </small>
    </div> -->

    <!-- Table options -->
    <!-- columnSorting -->
    <!-- height -->
    <!-- autoWrapRow -->
    <!-- autoWrapCol -->

    <div class="field">
      <p class="type-label">Column definitions</p>

      <!-- <template v-if="columDefinitions.length"> -->
      <!-- List of definitions  @todo: move to component-->
      <v-list v-for="(definition, idx) in columDefinitions">
        <v-list-item class="listItem" block :key="definition.key" :clickable="true" @click="()=> onEditDefinition(idx)">
          <div
            :style="{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }"
          >
            <span>
              {{ definition.header }}
              <VChip :xSmall="true">{{ definition.type }}</VChip></span
            >
            <v-icon name="close" @click="() => onDeleteColumnDefinition(idx)" />
          </div>
        </v-list-item>
      </v-list>

      <div :style="{ marginTop: '1rem' }">
        <v-button @click="addColumnDefinition" :small="true"
          >Add column definition</v-button
        >
      </div>

      <!-- Column definition drawer -->
      <template v-if="columnDefinitionEditorOpen">
        <ColumnDefinitionEditorDrawer
          :column="selectedColumnDefinition"
          @update="onUpdateColumnDefinition"
          @close="onCloseColumnDefinition"
        />
      </template>

    </div>
  </div>

  <!-- Repeater -->
  <!-- <div v-for="column in" -->
  <!-- heading -->
  <!-- type -->
  <!-- default value -->

  <!-- Rows -->
  <!-- Default number -->
  <!-- or -->
  <!-- Generator -->
  <!-- Rows from selection <columns with select> -->

  <!-- Preview -->
</template>

<style scoped>
.form {
  --theme--form--row-gap: 32px;
  --theme--form--column-gap: 32px;
  display: grid;
  grid-template-columns: [start] minmax(0, 1fr) [half] minmax(0, 1fr) [full];
  gap: var(--theme--form--row-gap) var(--theme--form--column-gap);
}

.field {
  grid-column: start/fill;
}
.label {
  margin-bottom: 8px;
}
.required {
  --v-icon-color: var(--theme--primary);
}

small {
  display: block;
  max-width: 520px;
  margin-top: 4px;
  color: var(--theme--foreground-subdued);
  font-style: italic;
}

.listItem {
  padding: var(
    --v-list-item-padding,
    0 8px 0 calc(8px + var(--v-list-item-indent, 0px))
  );
}
</style>
