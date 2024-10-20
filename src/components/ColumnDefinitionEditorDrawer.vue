<script lang="ts" setup>
import { computed, onMounted, ref, toRefs } from "vue";
import { useColumnDefinitions } from "../hooks/useColumnDefinition";
import SystemRawEditor from "../system-raw-editor/system-raw-editor.vue";
import { BaseCellDataType, ColDef } from "ag-grid-community";
import { InterfaceConfigProperties } from "./../types";

const props = defineProps<{
  column: Partial<ColDef>;
  create: boolean;
}>();

const emit = defineEmits<{
  (e: "update", value: ColDef): void;
  (e: "close"): void;
}>();

const { column } = toRefs(props);

const inputType = ref<string | null>(null);
const columnDefinitions = ref<Partial<ColDef>>(column.value);
const showDrawer = ref<boolean>(true);
const showTypeSelect = ref<boolean>(!column.value?.cellEditor);

const colDefs = useColumnDefinitions();
const { cellEditors, interfaceConfigDefinitions } = colDefs;

// lookup the cell editor type
const lookupCellEditorType = (cellEditor: string) => {
  const ce = cellEditors.find((editor) => editor.cellEditor === cellEditor);
  return ce?.value ?? undefined;
};

onMounted(() => {
  if (showTypeSelect.value) return;
  inputType.value = lookupCellEditorType(column.value.cellEditor);
});

// html form input field templates
const configurationDefinitionInputs = computed(() => {
  return interfaceConfigDefinitions[inputType.value]?.map((input) => {
    // disable column colId if previously saved
    if (input.name === "colId" && !!column?.value?.colId) {
      input.disabled = true;
    }

    return input;
  });
});

// emitter to close the drawer
const closeDrawer = () => {
  emit("close");
};

// emitter to update config
const emitUpdate = () => {
  emit("update", columnDefinitions.value as ColDef);
};

// on select cell type action
// only avilable for new configurations
const onSelectCellType = (value: BaseCellDataType) => {
  inputType.value = value;
  columnDefinitions.value = buildColumnDefinitionModelValue(value) as ColDef;
};

// form input update action
const updateField = (
  properties: InterfaceConfigProperties,
  value: string | number | boolean,
) => {
  // apply snakecase transformation
  if (properties.transformValue === "snakecase" && !!value) {
    value = (value as string).toLowerCase().replace(/\s+/g, "_");
  }

  // give a hidden field if setting for the first time
  if (properties.name === "colId") {
    columnDefinitions.value = {
      ...columnDefinitions.value,
      field: value as string,
    };
  }

  columnDefinitions.value = {
    ...columnDefinitions.value,
    [properties.name]: value,
  };
};

// builds the model
const buildColumnDefinitionModelValue = (type: BaseCellDataType) => {
  if (!configurationDefinitionInputs.value) return {};

  // lookup the cell data type
  const editorType = cellEditors.find((editor) => editor.value === type);

  let columnDefinition: ColDef = {
    cellDataType: editorType.cellDataType,
    cellEditor: editorType.cellEditor,
  };

  // set the default value
  configurationDefinitionInputs.value.forEach((input) => {
    // ignore info types
    if (input.type === "info") return;

    const baseKey = input.name;
    columnDefinition = {
      ...columnDefinition,
      [baseKey]: undefined,
    };
  });

  return columnDefinition;
};

// Form validator
const isFormValid = computed(() => {
  if (!configurationDefinitionInputs.value?.length) return false;
  const requiredInputs: string[] = [];

  configurationDefinitionInputs.value?.forEach((def) => {
    if (def.required) requiredInputs.push(def.name);
  });

  if (!requiredInputs.length) return true;

  return requiredInputs.every((key) => {
    return (columnDefinitions as any).value[key] !== undefined;
  });
});

// on save action
const saveDefinition = () => {
  emitUpdate();
  closeDrawer();
};
</script>

<template>
  <v-drawer v-model="showDrawer" @cancel="closeDrawer">
    <template #title>Column definition</template>
    <div class="form">
      <!-- Type selection -->
      <template v-if="showTypeSelect">
        <div class="halfCol">
          <div class="label type-label">
            <span>
              Type
              <v-icon name="star" filled sup />
            </span>
          </div>
          <v-select
            v-model="inputType"
            :items="cellEditors"
            @update:modelValue="onSelectCellType"
          />
        </div>
      </template>

      <!-- Form fields -->
      <template v-if="inputType">
        <template
          v-for="field in configurationDefinitionInputs"
          :key="field.name"
        >
          <div :class="`${field.fill}`">
            <!-- Notice -->
            <template v-if="field.type === 'info'">
              <v-notice>
                <p>
                  {{ field.value }}
                  <br />
                  <a :href="field.url" target="_blank">{{ field.info_url }}</a>
                </p>
              </v-notice>
            </template>

            <!-- Label -->
            <template v-if="field.label">
              <div class="label type-label">
                <span> {{ field.label }} {{ field.required ? "*" : "" }}</span>
              </div>
            </template>

            <!-- String type -->
            <template v-if="field.type === 'string'">
              <v-input
                v-model="columnDefinitions[field.name]"
                @update:modelValue="
                  (value: boolean) => updateField(field, value)
                "
                :disabled="field.disabled ?? false"
              />
            </template>

            <!-- Code type -->
            <template v-if="field.type === 'code'">
              <SystemRawEditor
                :value="columnDefinitions[field.name]"
                @input="(value: string) => updateField(field, value)"
                language="javascript"
              />
            </template>

            <!-- number -->
            <template v-if="field.type === 'number'">
              <v-input
                type="number"
                v-model="columnDefinitions[field.name]"
                @update:modelValue="
                  (value: boolean) => updateField(field, value)
                "
              />
            </template>

            <template v-if="field.type === 'checkbox'">
              <v-checkbox
                v-model="columnDefinitions[field.name]"
                @update:modelValue="
                  (value: boolean) => updateField(field, value)
                "
                block
              >
                {{ field.label }}
              </v-checkbox>
            </template>

            <template v-if="field.help">
              <small v-html="field.help" />
            </template>
            <template v-if="field.url">
              <small
                ><a :href="field.url" target="_blank">{{ field.url }}</a></small
              >
            </template>
          </div>
        </template>
      </template>
    </div>

    <template #actions>
      <VButton
        @click="saveDefinition"
        :outlined="false"
        :icon="true"
        :rounded="true"
        :disabled="!isFormValid"
      >
        <VIcon name="check" />
      </VButton>
    </template>
  </v-drawer>
</template>

<style scoped>
.form {
  --theme--form--row-gap: 32px;
  --theme--form--column-gap: 32px;
  display: grid;
  grid-template-columns: [start] minmax(0, 1fr) [half] minmax(0, 1fr) [full];
  gap: var(--theme--form--row-gap) var(--theme--form--column-gap);
  margin: 2rem;
}

.fullCol {
  grid-column: 1/3;
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

hr {
  line-height: 1px;
}

small {
  font-size: 0.9rem;
  line-height: 1.3rem;
}
</style>
