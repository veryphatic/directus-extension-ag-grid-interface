<script lang="ts" setup>
import { ref, toRefs, nextTick } from "vue";
import ColumnDefinitionEditorDrawer from "./ColumnDefinitionEditorDrawer.vue";
import { ColDef, GridOptions } from "ag-grid-community";
import { useColumnDefinitions } from "../hooks/useColumnDefinition";
import {
  useSortable,
  moveArrayElement,
} from "@vueuse/integrations/useSortable";

const props = defineProps<{
  value: Record<string, any> | null;
  collection: string;
}>();

const { value } = toRefs(props);

const emit = defineEmits<{
  (e: "input", value: Record<string, any> | null): void;
}>();

const el = ref<HTMLElement | null>(null);

const columnDefinitions = ref<ColDef[]>(value.value?.columnDefinitions ?? []);
const selectedColumnDefinition = ref<Partial<ColDef>>();
const selectedColumnDefinitionIndex = ref<number | null>(null);
const columnDefinitionEditorOpen = ref<boolean>(false);

const gridOptions = ref<Partial<GridOptions>>({
  headerHeight: value.value?.gridOptions?.headerHeight ?? 50,
});

const { cellEditors } = useColumnDefinitions();

useSortable(el, columnDefinitions, {
  onUpdate: (e) => {
    // do something
    moveArrayElement(columnDefinitions.value, e.oldIndex, e.newIndex);
    // nextTick required here as moveArrayElement is executed in a microtas
    // so we need to wait until the next tick until that is finished.
    nextTick(() => {
      /* do something */
      emitUpdate();
    });
  },
});

// add columnn definition button action
const addColumnDefinition = () => {
  selectedColumnDefinition.value = undefined;
  columnDefinitionEditorOpen.value = true;
};

// on drawer close actions
const onCloseColumnDefinition = () => {
  columnDefinitionEditorOpen.value = false;
  selectedColumnDefinition.value = undefined;
  selectedColumnDefinitionIndex.value = null;
};

// columnn update action
const onUpdateColumnDefinition = (update: ColDef) => {
  if (selectedColumnDefinitionIndex.value === null) {
    columnDefinitions.value = [...columnDefinitions.value, update];
  } else {
    columnDefinitions.value = columnDefinitions.value.map((def, idx) => {
      if (idx === selectedColumnDefinitionIndex.value) {
        return update;
      }
      return def;
    });
  }

  emitUpdate();
};

// on delete configuration action
const onDeleteColumnDefinition = (idx: number) => {
  columnDefinitions.value.splice(idx, 1);
  emitUpdate();
};

// on edit configuration action
const onEditDefinition = (idx: number) => {
  selectedColumnDefinitionIndex.value = idx;
  selectedColumnDefinition.value = { ...columnDefinitions.value[idx] };
  columnDefinitionEditorOpen.value = true;
};

// emit action
const emitUpdate = () => {
  emit("input", {
    columnDefinitions: columnDefinitions.value,
    gridOptions: gridOptions.value,
  });
};

// lookup the cell editor type
const lookupCellEditorType = (cellEditor: string) => {
  const ce = cellEditors.find((editor) => editor.cellEditor === cellEditor);
  return ce?.text;
};
</script>

<template>
  <div class="form">
    <div class="field">
      <h3 class="type-label">Column definitions</h3>

      <!-- list of column configurations -->

      <v-list ref="el">
        <v-list-item
          v-for="(column, idx) in columnDefinitions"
          class="listItem"
          block
          :key="column.colId"
          :clickable="true"
          @click="() => onEditDefinition(idx)"
        >
          <div
            :style="{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }"
          >
            <!-- <div class="input"> -->
            <div>
              <span class="v-icon drag-handle" :style="{ marginRight: '1rem' }">
                <v-icon name="drag_indicator" />
              </span>
            </div>

            <div :style="{ flexGrow: 1 }">
              <div class="label-inner">
                <span :style="{ marginRight: '1rem' }">{{
                  column.headerName
                }}</span>

                <VChip :xSmall="true">
                  {{ lookupCellEditorType(column.cellEditor) }}
                </VChip>
              </div>
            </div>

            <div>
              <v-icon
                name="close"
                @click="() => onDeleteColumnDefinition(idx)"
              />
            </div>
          </div>
        </v-list-item>
      </v-list>

      <div :style="{ marginTop: '1rem' }">
        <VButton @click="addColumnDefinition" :small="true">
          Add column definition
        </VButton>
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

    <div class="field">
      <h3 class="type-label" :style="{ marginBottom: '1rem' }">Grid options</h3>

      <div class="label type-label">
        <span>Header height</span>
      </div>
      <v-input
        v-model="gridOptions['headerHeight']"
        @update:modelValue="emitUpdate"
      />
    </div>
  </div>
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
