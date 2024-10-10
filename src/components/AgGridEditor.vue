<script lang="ts" setup>
import { toRefs, computed, shallowRef, toRaw, watchEffect, onMounted } from "vue";
import { ref } from "vue";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import { AgGridVue } from "@ag-grid-community/vue3"; // Vue Data Grid Component
import { ColDef, BaseCellDataType } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";

import { useColumnDefinitions } from "../hooks/useColumnDefinition";
import { useSdk } from "@directus/extensions-sdk";
import { readMe } from "@directus/sdk";

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

const {
  value,
  primaryKey,
  collection,
  field,
  disabled,
  showNavigation,
  columnDefinitions,
} = toRefs(props);

// const gridReady = ref(false);

const gridApi = shallowRef();

const emit = defineEmits<{
  (e: "input", value: Record<string, any> | null): void;
}>();

// console.log("AGGrid: props", {
//   value: value,
//   primaryKey: primaryKey?.value,
//   collection: collection?.value,
//   field: field?.value,
//   disabled: disabled?.value,
//   showNavigation: showNavigation?.value,
//   columnDefinitions: columnDefinitions?.value,
// });

const rowData = ref(value.value ?? []);
console.log('props', toRaw(props))

watchEffect(() => {
  if (!props.value || !gridApi.value) return;
  
  rowData.value = props.value;
  console.log('watchEffect', toRaw(rowData.value))
  gridApi.value.setGridOption("rowData", toRaw(rowData.value));
})

// onMounted(() => {
//   console.log('rowData', rowData.value)
//   gridApi.value.setGridOption("rowData", rowData.value);
// })


const { cellEditors, interfaceConfigDefinitions } = useColumnDefinitions();

// const sdk = useSdk();
// console.log("sdk", sdk);

// const result = await sdk.request(readMe());
// console.log("result", result);

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
    // console.log("type ----------", type, col);
    if (!type) return;

    const cellEditorProps = interfaceConfigDefinitions[type]
      ?.filter((input) => {
        return input?.cellEditorParams;
      })
      .map((input) => input.name);

    // console.log("cellEditorProps", cellEditorProps);

    return Object.keys(col).reduce(
      (updatedCol, key) => {
        // update the cellEditorParams
        if (cellEditorProps?.includes(key)) {
          return {
            ...updatedCol,
            cellEditorParams: {
              ...updatedCol.cellEditorParams,
              [key]: col[key],
            },
          };
        }

        // convert valueFormatters to functions
        const fnTypes = ["valueFormatter"];
        if (fnTypes.includes(key) && col[key] !== null) {
          const fn = new Function("return " + col[key])();
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
    delete def.type;
    return def;
  });
});

// override `date` to handle custom date format `dd/mm/yyyy`
const dataTypeDefinitions = ref({
  date: {
    baseDataType: "date",
    extendsDataType: "date",
    valueParser: (params) => {
      // console.log("-----------------------------------", params);
      if (params.newValue == null) {
        return null;
      }
      // convert from `dd/mm/yyyy`
      const dateParts = params.newValue.split("/");
      return dateParts.length === 3
        ? new Date(
            parseInt(dateParts[2]),
            parseInt(dateParts[1]) - 1,
            parseInt(dateParts[0]),
          )
        : null;
    },
    valueFormatter: (params) => {
      // console.log("+++++++++++++++++++++++++", params);
      if (params.value === null) return;

      // convert to `dd/mm/yyyy`
      const date = typeof params.value === 'object' ? params.value : new Date(params.value);
      return params.value == null
        ? ""
        : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
  },
});

// const getFieldDefaultValue = (type) => {
//   let value = null;
//   console.log("type", type);
//   switch (type) {
//     case "text":
//     case "largeText":
//       value = "";
//       break;
//     case "number":
//       value = 0;
//       break;
//     case "boolean":
//       value = false;
//       break;
//     case "date":
//     case "dateString":
//     case "select":
//       value = null;
//       break;
//   }

//   return value;
// };

// returns an empty row for each column in the configuration
const getEmptyRow = () => {
  return agGridColumnDefinitions.value.reduce((emptyRow, col) => {
    emptyRow = {
      ...emptyRow,
      [col.colId]: null, //getFieldDefaultValue(col.type),
    };
    return emptyRow;
  }, {});
};

const addRow = () => {
  const emptyRowSet = getEmptyRow();
  rowData.value.push(emptyRowSet);

  console.log("addRow", rowData.value, emptyRowSet);
  gridApi.value.setGridOption("rowData", rowData.value);
};

const onGridReady = (params) => {
  gridApi.value = params.api;
};

const updateGridData = (event) => {
  console.log('updateGridData event', event);
  // console.log('rowData', rowData.value)
  emitUpdate();
};

// emit action
const emitUpdate = () => {
  console.log("emitUpdate", rowData.value);
  emit("input",rowData.value);
};

console.log("agGridColumnDefinitions", agGridColumnDefinitions.value);
console.log("rowData", rowData.value);
</script>

<template>
  <p>Test</p>
  <AgGridVue
    :onGridReady="onGridReady"
    :rowData="rowData"
    :columnDefs="gridColumnDefinitions"
    @cell-value-changed="updateGridData"
    :dataTypeDefinitions="dataTypeDefinitions"
    style="height: 500px; width: 100%"
    class="ag-theme-quartz"
  />
  <div>
    <VButton @click="addRow" small>Add Row</VButton>
  </div>
  <pre>{{ rowData }}</pre>
</template>
