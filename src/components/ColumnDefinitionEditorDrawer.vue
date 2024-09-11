<script lang="ts" setup>
import { computed, ref, toRefs } from "vue";
import {
  ColumnDefinitionProperties,
  InterfaceConfigProperties,
} from "../types";
import { useColumnDefinitions } from "../hooks/useColumnDefinition";
import { GridSettings } from "handsontable/settings";
import SystemRawEditor from "../system-raw-editor/system-raw-editor.vue";

import { BaseCellDataType, ColDef } from "ag-grid-community";

/**
 * ColumnDefinitionEditorDrawer
 * Column definition builder
 */

const props = defineProps<{
  column: Partial<ColumnDefinitionProperties>;
  create: boolean;
}>();

const emit = defineEmits<{
  (e: "update", value: GridSettings): void;
  (e: "close"): void;
}>();

const { column } = toRefs(props);
const inputType = ref(column.value?.type ?? "");
const columnSettings = ref<GridSettings>(column.value ?? {});
const didMutate = ref<boolean>(false);
const showDrawer = ref<boolean>(true);
const showTypeSelect = ref<boolean>(!column.value?.type);
const columnDefinitions = useColumnDefinitions();
const { cellTypesList, interfaceConfigDefinitions } = columnDefinitions;

// input field templates
const configurationDefinitionInputs = computed(() => {
  return interfaceConfigDefinitions[inputType.value];
});

const closeDrawer = () => {
  // showDrawer.value = false;
  emit("close");
};

const emitUpdate = () => {
  emit("update", columnSettings.value as GridSettings);
};

// Only avilable for new configurations
const onSelectCellType = (value: BaseCellDataType) => {
  didMutate.value = true;
  inputType.value = value;
  columnSettings.value = buildNewColumnDefinitions(value) as GridSettings;
};

const updateField = (
  field: InterfaceConfigProperties,
  value: string | number | boolean,
) => {
  console.log("updateField", field, value);

  let transformedValue = value;

  // handle keys
  if (field.transformValue === "snakecase" && !!transformedValue) {
    transformedValue = (value as string).toLowerCase().replace(/\s+/g, "_");
  }

  didMutate.value = true;
  columnSettings.value = {
    ...columnSettings.value,
    [field.name as string]: transformedValue,
  };

  console.log("columnSettings", columnSettings.value);

  // emitUpdate();
};

// const buildNewColumnDefinitions = (type: CellType) => {
const buildNewColumnDefinitions = (type: BaseCellDataType) => {
  if (!configurationDefinitionInputs.value) return {};

  // let columnDefinition: GridSettings = {
  //   type: type,
  // };
  let columnDefinition: ColDef = {
    type: type,
  };

  configurationDefinitionInputs.value.forEach((input) => {
    // ignore info types
    if (input.type === "info") return;

    // handle nested keys
    const keys = input.name.split(".");
    const baseKey = keys[0] as keyof GridSettings;

    // if there is a split create a nested object
    if (keys.length > 1) {
      const nestedKey = keys[1];
      columnDefinition[baseKey] = {};
      columnDefinition[baseKey][nestedKey] = input.default ?? undefined;
    }

    // otherwise don't
    else {
      columnDefinition[baseKey] = input.default ?? undefined;
    }
  });

  return columnDefinition;
};

const isFormValid = computed(() => {
  const requiredInputs = [];

  // iterate over each columnDefinition and validate against configurationDefinitionInputs
  // for (const key in configurationDefinitionInputs.value) {
  configurationDefinitionInputs.value?.forEach((def) => {
    if (def.required) requiredInputs.push(def.name);
  });
  //   console.log('key ---', key);
  //   if (configurationDefinitionInputs.value[key]?.required) requiredInputs.push(key);
  // }

  console.log(
    "requiredInputs",
    requiredInputs,
    configurationDefinitionInputs.value,
  );

  if (!requiredInputs.length) return true;

  return requiredInputs.some((input) => {
    const nestedKeys = input.split(".");
    const baseKey = nestedKeys[0];
    const childKey = nestedKeys[1];

    console.log("checking ...", baseKey, columnSettings.value);

    if (nestedKeys.length > 1) {
      console.log("checking nested input", columnSettings.value[baseKey]);
      return !!columnSettings.value[baseKey][childKey];
    }
    console.log("checking input", columnSettings.value[baseKey]);
    return !!columnSettings.value[baseKey];
  });
});

const saveDefinition = () => {
  // validate values

  emitUpdate();
  closeDrawer();
};
</script>

<template>
  <v-drawer v-model="showDrawer" @cancel="closeDrawer">
    <template #title>Column definition</template>
    <div class="form">
      <strong>isFormValid {{ isFormValid }}</strong>
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
            :items="cellTypesList"
            @update:modelValue="onSelectCellType"
          />
        </div>
      </template>

      <!-- Form fields -->
      <template v-if="inputType">
        <!-- <div class="field full">
          <hr />
        </div> -->

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
                v-model="columnSettings[field.name]"
                @update:modelValue="
                  (value: boolean) => updateField(field, value)
                "
              />
            </template>

            <!-- Code type -->
            <template v-if="field.type === 'code'">
              <SystemRawEditor
                :value="columnSettings[field.name]"
                @input="(value: string) => updateField(field, value)"
                language="javascript"
                type="json"
              />
            </template>

            <!-- number -->
            <template v-if="field.type === 'number'">
              <v-input
                type="number"
                v-model="columnSettings[field.name]"
                @update:modelValue="
                  (value: boolean) => updateField(field, value)
                "
              />
            </template>

            <template v-if="field.type === 'checkbox'">
              <v-checkbox
                v-model="columnSettings[field.name]"
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

    <pre>{{ columnSettings }}</pre>

    <template #actions>
      <VButton
        @click="saveDefinition"
        :outlined="false"
        :icon="true"
        :rounded="true"
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

/* .half {
  grid-column: auto;
} */

hr {
  line-height: 1px;
}

small {
  font-size: 0.9rem;
  line-height: 1.3rem;
}
</style>
