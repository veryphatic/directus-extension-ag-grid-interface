<script lang="ts" setup>
import {
  toRefs,
  computed,
  shallowRef,
  toRaw,
  watchEffect,
  onMounted,
  onBeforeMount,
} from "vue";
import { ref } from "vue";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import { AgGridVue } from "@ag-grid-community/vue3";
import { ColDef } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";

import { useColumnDefinitions } from "../hooks/useColumnDefinition";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import Decimal from "decimal.js";
import { convertToFunction } from "../utils/convertToFunction";
import { getDefaultValue } from "../utils/getFieldDefaultValue";

// make decimal available for valueGetters et al
window.Decimal = Decimal;

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const props = defineProps<{
  // directus props
  value: (number | string | Record<string, any>)[] | Record<string, any> | null;
  primaryKey: string | number;
  collection: string;
  field: string;
  disabled?: boolean;
  showNavigation?: boolean;

  // interface props
  columnDefinitions: ColDef[];
}>();

const emit = defineEmits<{
  (e: "input", value: Record<string, any> | null): void;
}>();

const { value, columnDefinitions } = toRefs(props);

const currentUser = ref();
const gridApi = shallowRef();
const { getUser } = useGetCurrentUser();
const rowData = ref(value.value ?? []);

watchEffect(() => {
  if (!props.value || !gridApi.value) return;

  rowData.value = props.value;
  gridApi.value.setGridOption("rowData", toRaw(rowData.value));
});

onMounted(async () => {
  currentUser.value = await getUser();
});

const { cellEditors, interfaceConfigDefinitions } = useColumnDefinitions();

// lookup the cell editor type
const lookupCellEditorType = (cellEditor: string) => {
  const ce = cellEditors.find((editor) => editor.cellEditor === cellEditor);
  return ce?.value;
};

// returns an ag-grid configuration
const agGridColumnDefinitions = computed(() => {
  return columnDefinitions.value.map((col) => {
    // reformat the object to use cellEditorParams
    const type = lookupCellEditorType(col.cellEditor);
    if (!type) return;

    const cellEditorProps = interfaceConfigDefinitions[type]
      ?.filter((input) => {
        return input?.cellEditorParams;
      })
      .map((input) => input.name);

    return Object.keys(col).reduce(
      (updatedCol, key) => {
        // update the cellEditorParams
        if (cellEditorProps?.includes(key)) {
          // functionize values expressions
          if (key === "values") {
            const values = convertToFunction(col[key]);

            return {
              ...updatedCol,
              cellEditorParams: {
                ...updatedCol.cellEditorParams,
                values: values,
              },
            };
          }

          return {
            ...updatedCol,
            cellEditorParams: {
              ...updatedCol.cellEditorParams,
              [key]: col[key],
            },
          };
        }

        // convert valueFormatters to functions
        const fnTypes = [
          "valueGetter",
          "valueSetter",
          "valueParser",
          "valueFormatter",
          "cellStyle",
        ];

        if (fnTypes.includes(key) && col[key] !== null) {
          const fn = convertToFunction(col[key]);
          return {
            ...updatedCol,
            [key]: fn,
          };
        }

        return { ...updatedCol, [key]: col[key] ?? undefined };
      },
      { cellEditorParams: {} },
    );
  });
});

// cleanup to remove configuration properties
const gridColumnDefinitions = computed(() => {
  return agGridColumnDefinitions.value.map((def) => {
    // delete def.type;
    return def;
  });
});

// override `date` to handle custom date format `dd/mm/yyyy`

// this is causing a bug where the value is cleared when clicking on the date cell without making changes
// disabled 'date' type from useColumnDefinitions

const dataTypeDefinitions = ref();
// const dataTypeDefinitions = ref(
//   (dataTypeDefinitions.value = {
//     date: {
//       baseDataType: "date",
//       extendsDataType: "date",
//       valueParser: (params) => {
//         if (params.newValue == null) {
//           return null;
//         }
//         // convert from `dd/mm/yyyy`
//         const dateParts = params.newValue.split("/");
//         return dateParts.length === 3
//           ? new Date(
//               parseInt(dateParts[2]),
//               parseInt(dateParts[1]) - 1,
//               parseInt(dateParts[0]),
//             )
//           : null;
//       },
//       valueFormatter: (params) => {
//         if (params.value === null) return;

//         // convert to `dd/mm/yyyy`
//         const date =
//           typeof params.value === "object"
//             ? params.value
//             : new Date(params.value);
//         return params.value == null
//           ? ""
//           : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//       },
//     },
//   }),
// );

// returns an empty row for each column in the configuration
const getEmptyRow = () => {
  return agGridColumnDefinitions.value.reduce((emptyRow, col) => {
    return {
      ...emptyRow,
      [col.colId]: getDefaultValue(col.cellEditor, currentUser.value),
    };
  }, {});
};

const addRow = () => {
  const emptyRowSet = getEmptyRow();
  rowData.value.push(emptyRowSet);

  gridApi.value.setGridOption("rowData", rowData.value);
  emitUpdate();
};

const onGridReady = (params) => {
  gridApi.value = params.api;
  gridApi.value.autoSizeAllColumns();
};

const updateGridData = (event) => {
  // prevent clearing of date fields when clicking on them
  if (
    event.colDef.cellEditor === "agDateCellEditor" &&
    event.newValue === null
  ) {
    // gridApi.value.refreshCells();
    return;
  }

  emitUpdate();
};

// emit action
const emitUpdate = () => {
  emit("input", rowData.value);
};
</script>

<template>
  <div style="width: 100%; flex: 1 1 auto">
    <AgGridVue
      :onGridReady="onGridReady"
      :rowData="rowData"
      :columnDefs="gridColumnDefinitions"
      domLayout="autoHeight"
      @cell-value-changed="updateGridData"
      :dataTypeDefinitions="dataTypeDefinitions"
      style="width: 100%"
      class="ag-theme-quartz"
    />
  </div>
  <div :style="{ marginTop: '1rem' }">
    <VButton @click="addRow" small>Add Row</VButton>
  </div>
</template>
