import { CellType } from "handsontable/cellTypes";
import { InterfaceConfigProperties } from "./../types";

const useColumnDefinitions = () => {
    const cellTypesList = [
        { value: "autocomplete", text: "Autocomplete" },
        { value: "checkbox", text: "Checkbox" },
        { value: "date", text: "Date " },
        { value: "dropdown", text: "Dropdown" },
        { value: "numeric", text: "Numeric" },
        { value: "text", text: "Text" },
        { value: "time", text: "Time" },
    ];

    const interfaceConfigDefinitions: Record<string, InterfaceConfigProperties[]> = {
        checkbox: [
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value:
                    "Create interactive elements that can be checked or unchecked, by using the checkbox cell type.",
                info_url: "https://handsontable.com/docs/javascript-data-grid/checkbox-cell-type/",
            },
            { type: "string", name: "header", label: "Column Header", fill: "fullCol" },
            { type: "string", name: "key", label: "Key", fill: "fullCol", required: true, help: 'This column\'s key (cannot be changed after save)'},
            {
                type: "string",
                name: "checkedTemplate",
                label: "Checked template",
                fill: "halfCol",
                help: "The checkedTemplate option lets you configure what value an checked checkbox cell has. (Default: true)",
                default: true,
                url: "https://handsontable.com/docs/react-data-grid/api/options/#checkedtemplate",
            },
            {
                type: "string",
                name: "uncheckedTemplate",
                label: "Unchecked template",
                fill: "halfCol",
                default: false,
                help: 'The uncheckedTemplate option lets you configure what value an unchecked checkbox cell has. (Default: false)',
                url: "https://handsontable.com/docs/react-data-grid/api/options/#uncheckedtemplate",
            },
            {
                type: "string",
                name: "label.value",
                label: "Label text",
                fill: 'halfCol'
            },
            {
                type: "string",
                name: "label.separated",
                label: "Label separated",
                fill: 'halfCol'
            },
            {
                type: "string",
                name: "label.position",
                label: "Label position",
                help: "Default value is `false`",
                fill: 'halfCol',
                default: false,
                url: "https://handsontable.com/docs/react-data-grid/api/options/#label",
            },
            {
                type: "string",
                name: "defaultValue",
                label: "Default value",
                fill: "fullCol",
            }
        ],
        date: [
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value:
                    "Use the date cell type to display, format, and validate date values. Pick a date using an interactive pop-up editor.",
                info_url: "https://handsontable.com/docs/javascript-data-grid/date-cell-type/",
            },
            { type: "string", name: "header", label: "Column Header", fill: "fullCol" },
            { type: "string", name: "key", label: "Key", fill: "fullCol", required: true, help: 'This column\'s key (cannot be changed after save)'},
            {
                type: "string",
                name: "dateFormat",
                label: "Date Format",
                fill: "halfCol",
                default: 'DD/MM/YYYY',
                help: "You can set the dateFormat option to a string with a proper date format. (Default: DD/MM/YYYY)",
                url: "https://handsontable.com/docs/react-data-grid/api/options/#dateformat",
            },
            {
                type: "checkbox",
                name: "correctFormat",
                label: "Correct format?",
                fill: "halfCol",
                default: false,
                help: 'The correctFormat option configures whether incorrectly-formatted times and dates are amended or not. (Default: false)',
                url: 'https://handsontable.com/docs/react-data-grid/api/options/#correctformat'
            },
            {
                type: "string",
                name: "defaultDate",
                label: "Default date",
                fill: "fullCol",
            }
        ],
        autocomplete: [
            {
                type: "info",
                name: 'info',
                fill: 'fullCol',
                value:
                    `
                    Collect user input with a list of choices, by using the autocomplete cell type. You can complete the autocomplete cell type in three different ways:
                    - Flexible mode
                    - Strict mode
                    - Strict mode using Ajax
            `,
                info_url: "https://handsontable.com/docs/react-data-grid/autocomplete-cell-type/",
            },
            { type: "string", name: "header", label: "Column Header", fill: "fullCol" },
            { type: "string", name: "key", label: "Key", fill: "fullCol", required: true, help: 'This column\'s key (cannot be changed after save)'},
            {
                type: "checkbox",
                name: "allowHTML",
                label: "Allow HTML?",
                fill: "halfCol",
                default: false,
                help: "The allowHtml option configures whether autocomplete and dropdown cells' source data is treated as HTML. (Default: false)"
            },
            {
                type: "checkbox",
                name: "filteringCaseSensitive",
                label: "Filter using case-sensitivity?",
                fill: "halfCol",
                default: false,
                help: "The filteringCaseSensitive option configures whether autocomplete cells' input is case-sensitive. (Default: false)"
            },
            {
                type: "code",
                name: "source",
                label: "Source",
                fill: "fullCol",
                required: true,
                help: "The source option sets options available in autocomplete and dropdown cells. You must return an array or a function (returns array)",
                url: "https://handsontable.com/docs/react-data-grid/api/options/#source",
            },
            {
                type: "checkbox",
                name: "strict",
                label: "Set the strict mode (strict/flexible)",
                fill: "halfCol",
                default: false,
                help: `
                Strict mode (true). The end user: 
                - Can only choose one of suggested values
                - Can't enter a custom value
                Flexible mode(false). The end user:
                - Can choose one of suggested values
                - Can enter a custom value
                `,
                url: 'https://handsontable.com/docs/react-data-grid/api/options/#strict'
            },
            {
                type: "number",
                name: "visibleRows",
                label: "Number visible rows",
                fill: "halfCol",
                default: false
            },
            {
                type: "checkbox",
                name: "trimDropdown",
                label: "Trim dropdown",
                fill: "halfCol",
                help: 'The trimDropdown option configures the width of the autocomplete and dropdown lists.'
            },
            {
                type: "string",
                name: "defaultValue",
                label: "Default value",
                fill: "fullCol",
            }
        ],
        dropdown: [
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value:
                    "Collect user input with a searchable list of choices, by using the dropdown cell type.",
                info_url: "https://handsontable.com/docs/javascript-data-grid/dropdown-cell-type/",
            },
            { type: "string", name: "header", label: "Column Header", fill: "fullCol" },
            { type: "string", name: "key", label: "Key", fill: "fullCol", required: true, help: 'This column\'s key (cannot be changed after save)'},
            {
                type: "checkbox",
                name: "allowHTML",
                label: "Allow HTML?",
                fill: "halfCol",
                help: "The allowHtml option configures whether autocomplete and dropdown cells' source data is treated as HTML. (Default: false)"
            },
            {
                type: "code",
                name: "source",
                label: "Source",
                fill: "fullCol",
                help: "The source option sets options available in autocomplete and dropdown cells. You must return an array or a function (returns array)",
                url: "https://handsontable.com/docs/react-data-grid/api/options/#source",
            },
            {
                type: "number",
                name: "visibleRows",
                label: "Number visible rows",
                fill: "halfCol",
                default: false
            },

            {
                type: "checkbox",
                name: "trimDropdown",
                label: "Trim dropdown",
                fill: "halfCol",
                help: 'The trimDropdown option configures the width of the autocomplete and dropdown lists.'
            },
            {
                type: "string",
                name: "defaultValue",
                label: "Default value",
                fill: "fullCol",
            }
        ],
        numeric: [
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value:
                    "Display, format, sort, and filter numbers correctly by using the numeric cell type.",
                info_url: "https://handsontable.com/docs/javascript-data-grid/numeric-cell-type/",
            },
            { type: "string", name: "header", label: "Column Header", fill: "fullCol" },
            { type: "string", name: "key", label: "Key", fill: "fullCol", required: true, help: 'This column\'s key (cannot be changed after save)'},
            {
                type: "string",
                name: "numericFormat.pattern",
                label: "Pattern",
                fill: "halfCol",
                url: "https://handsontable.com/docs/react-data-grid/api/options/#numericformat",
            },
            {
                type: "string",
                name: "numericFormat.culture",
                label: "Culture",
                fill: "halfCol",
                url: "https://handsontable.com/docs/react-data-grid/api/options/#numericformat",
            },
            {
                type: "string",
                name: "defaultValue",
                label: "Default value",
                fill: "fullCol",
            },
            {
                type: "checkbox",
                name: "allowEmpty",
                label: "Allow empty values?",
                fill: "halfCol",
            }
        ],
        time: [
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value:
                    "Use the time cell type to display, format, and validate values as times. The time cell type uses Moment.js as a time formatter.",
                info_url: "https://handsontable.com/docs/javascript-data-grid/time-cell-type/",
            },
            { type: "string", name: "header", label: "Column Header", fill: "fullCol" },
            { type: "string", name: "key", label: "Key", fill: "fullCol", required: true, help: 'This column\'s key (cannot be changed after save)'},
            {
                type: "string",
                name: "timeFormat",
                label: "Time Format",
                fill: "halfCol",
                help: "(Default format: h:mm:ss a)",
                default: 'h:mm:ss a',
                url: "https://handsontable.com/docs/react-data-grid/api/options/#timeformat",
            },
            {
                type: "checkbox",
                name: "correctiFormat",
                label: "Correct format?",
                default: true,
                help: "(Default: true)",
                fill: "halfCol",
            },
            {
                type: "string",
                name: "defaultValue",
                label: "Default value",
                fill: "fullCol",
            }
        ],
        text: [
            {
                type: "info",
                name: "info",
                fill: 'fullCol',
                value: "The text cell type is the default type.",
                info_url: "https://handsontable.com/docs/javascript-data-grid/cell-type/",
            },
            { type: "string", name: "header", label: "Column Header", fill: "fullCol" },
            { type: "string", name: "key", label: "Key", fill: "fullCol", required: true, help: 'This column\'s key (cannot be changed after save)'},
            {
                type: "string",
                name: "defaultValue",
                label: "Default value",
            }
            
        ],
    };

    return {
        cellTypesList,
        interfaceConfigDefinitions,
    };
};

export { useColumnDefinitions };
