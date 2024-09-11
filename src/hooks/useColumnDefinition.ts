import { InterfaceConfigProperties } from "./../types";

const useColumnDefinitions = () => {
    const cellEditors = [
        { value: "boolean", text: "Boolean" },
        { value: "date", text: "Date" },
        { value: "dateString", text: "Date String" },
        { value: "select", text: "Select" },
        { value: "number", text: "Number" },
        { value: "text", text: "Text" },
        { value: "largeText", text: "Large Text" }
    ];

    const commonColumnConfigurations: InterfaceConfigProperties[] = [
        { type: "string", name: "headerName", label: "Header Name", fill: "fullCol", required: true, help: 'The name to render in the column header.' },
        { type: "string", name: "colId", label: "Column ID", fill: "fullCol", required: true, help: 'This column\'s unique ID (cannot be changed after save)', transformValue: 'snakecase' },
        { type: "checkbox", name: "editable", label: "Editable", fill: "halfCol", required: false, help: 'Set to `true` if this column is editable, otherwise `false`.' },
        { type: "checkbox", name: "singleClickEdit", label: "Single Click Edit", fill: "halfCol", required: false, help: ' Set to `true` to have the text wrap inside the cell - typically used with `autoHeight`.' },
        { type: "checkbox", name: "autoHeight", label: "Auto Height", fill: "halfCol", required: false, help: 'Set to `true` to have the grid calculate the height of a row based on contents of this column.' },
        { type: "checkbox", name: "wrapText", label: "Wrap Text", fill: "halfCol", required: false, help: 'Set to `true` to have cells under this column enter edit mode after single click.' },
        { type: "number", name: "width", label: "Width", fill: "fullCol", required: false, help: 'Initial width in pixels for the cell.' },
        { type: "number", name: "flex", label: "Flex", fill: "fullCol", required: false, help: 'Used instead of `width` when the goal is to fill the remaining empty space of the grid.' },
        { type: "code", name: "valueGetter", label: "Value Getter", required: false, help: 'Function or expression. Gets the value from your data for display.' },
        { type: "code", name: "valueSetter", label: "Value Setter", required: false, help: 'Function or expression. Sets the value into your data for saving. Return `true` if the data changed.' },
        { type: "code", name: "valueParser", label: "Value Parser", required: false, help: 'Function or expression. Parses the value for saving.' },
    ]

    const interfaceConfigDefinitions: Record<string, InterfaceConfigProperties[]> = {
        boolean: [
            ...commonColumnConfigurations,
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value: "The 'boolean' cell data type is used for boolean values.",
                info_url: "https://www.ag-grid.com/vue-data-grid/cell-data-types/#boolean",
            },
        ],
        date: [
            ...commonColumnConfigurations,
            { type: "string", name: "min", label: "Min", fill: "halfCol", required: false, help: 'Min allowed value. String in format "yyyy-mm-dd"' },
            { type: "string", name: "max", label: "Max", fill: "halfCol", required: false, help: 'Max allowed value. String in format "yyyy-mm-dd"' },
            {
                type: "number", name: "step", label: "Step", fill: "halfCol", required: false, help: `Size of the value change when stepping up/down, starting from min or the initial value if provided. 
                Step is also the difference between valid values. If the user-provided value isn\'t a multiple of the step value from the starting value, it will be considered invalid. Defaults to any value allowed.` },
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value: "The 'date' cell data type is used for date values that are represented as Date objects.",
                info_url: "https://www.ag-grid.com/vue-data-grid/cell-data-types/#date",
            },
        ],
        dateString: [
            ...commonColumnConfigurations,
            { type: "string", name: "min", label: "Min", fill: "halfCol", required: false, help: 'Min allowed value. String in format "yyyy-mm-dd"' },
            { type: "string", name: "max", label: "Max", fill: "halfCol", required: false, help: 'Max allowed value. String in format "yyyy-mm-dd"' },
            {
                type: "number", name: "step", label: "Step", fill: "halfCol", required: false, help: `Size of the value change when stepping up/down, starting from min or the initial value if provided. \
                Step is also the difference between valid values. If the user-provided value isn\'t a multiple of the step value from the starting value, it will be considered invalid. Defaults to any value allowed.`
            },
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value: "The 'dateString' cell data type is used for date values that are represented as string values.",
                info_url: "https://www.ag-grid.com/vue-data-grid/cell-data-types/#date-as-string",
            },
        ],
        select: [
            ...commonColumnConfigurations,
            { type: "code", name: "values", label: "Values", fill: "fullCol", required: false, help: 'List of values to display' },
            { type: "number", name: "valueListGap", label: "Value List Gap", fill: "fullCol", required: false, help: 'The space in pixels between the value display and the list of items.' },
            { type: "number", name: "valueListMaxHeight", label: "Value List Max Height", fill: "halfCol", required: false, help: 'The maximum height of the list of items as pixels.' },
            { type: "number", name: "valueListMaxWidth", label: "Value List Max Width", fill: "halfCol", required: false, help: 'The maximum width of the list of items as pixels.' },
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value: "The 'select editor' is a 'text' cell data type and used for string values.",
                info_url: "https://www.ag-grid.com/vue-data-grid/cell-data-types/#text",
            },

        ],
        number: [
            ...commonColumnConfigurations,
            { type: "number", name: "min", label: "Min Value", fill: "halfCol", required: false, help: 'Min allowed value.' },
            { type: "number", name: "max", label: "Max Value", fill: "halfCol", required: false, help: 'Max allowed value.' },
            { type: "number", name: "precision", label: "Precision", fill: "halfCol", required: false, help: 'Number of digits allowed after the decimal point.' },
            { type: "number", name: "step", label: "Step", fill: "halfCol", required: false, help: 'Size of the value change when stepping up/down, starting from min or the initial value if provided.' },
            { type: "checkbox", name: "showStepperButtons", label: "Show Stepper Buttons", fill: "halfCol", required: false, help: 'Display stepper buttons in editor.' },
            { type: "checkbox", name: "preventStepping", label: "Prevent Stepping", fill: "halfCol", required: false, help: 'Set to true to prevent key up/down from stepping the field\'s value.' },
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value: "The 'number' cell data type is used for number values.",
                info_url: "https://www.ag-grid.com/vue-data-grid/cell-data-types/#number",
            },
        ],
        text: [
            ...commonColumnConfigurations,
            { type: "number", name: "maxLength", label: "Max Length", fill: "fullCol", required: false, help: 'Max number of characters to allow. (Default is 524288)' },
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value: "The 'text' cell data type is used for string values. ",
                info_url: "https://www.ag-grid.com/vue-data-grid/cell-data-types/#text",
            },
        ],
        largeText: [
            ...commonColumnConfigurations,
            { type: "number", name: "maxLength", label: "Max Length", fill: "fullCol", required: false, help: 'Max number of characters to allow. (Default is 200)' },
            { type: "number", name: "rows", label: "Rows", fill: "fullCol", required: false, help: 'Number of character rows to display. (Default is 10)' },
            { type: "number", name: "cols", label: "Cols", fill: "fullCol", required: false, help: 'Number of character columns to display. (Default is 60)' },
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value: "The 'large text editor' is a 'text' cell data type and used for string values. ",
                info_url: "https://www.ag-grid.com/vue-data-grid/cell-data-types/#text",
            },
        ],
    };

    return {
        cellTypesList: cellEditors,
        interfaceConfigDefinitions,
    };
};

export { useColumnDefinitions };


/**
            // {
            //     type: "info",
            //     name: "info",
            //     fill: 'fullCol',
            //     value: "The 'date' cell data type is used for date values that are represented as Date objects.",
            //     info_url: "https://www.ag-grid.com/vue-data-grid/cell-data-types/#date",
            // },
 */