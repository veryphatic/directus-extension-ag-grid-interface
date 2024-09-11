import { CellType } from "handsontable/cellTypes"
import { LabelOptions, SelectOptionsObject } from "handsontable/common";
import { CellProperties, GridSettings } from "handsontable/settings";



enum InterfaceSettingsTypes {
    string,
    code,
    number,
    checkbox,
    info
}

enum InterfaceSettingsFill {
    fullCol,
    halfCol,
}

// internal layout for admin interface
export type InterfaceConfigProperties = {
    type: keyof typeof InterfaceSettingsTypes,
    name: string,
    label?: string,
    default?: boolean | string | number,
    fill?: keyof typeof InterfaceSettingsFill,
    value?: string,
    help?: string,
    url?: string,
    info_url?: string,
    required?: boolean
    transformValue?: string
}



export type ColumnDefinitionProperties = GridSettings & {
    key: string,
    header: string
    // type: CellType,
    // settings: GridSettings,
    // interface: InterfaceConfigProperties
}


// move this somewhere
type CheckboxType = {
    type: 'checkbox',
    checkedTemplate?: boolean | string | number;
    uncheckedTemplate?: boolean | string | number;
    label?: LabelOptions;
}

type DateType = {
    type: 'date',
    dateFormat?: string,
    correctFormat?: boolean,
}

type DropdownType = {
    type: 'dropdown',
    allowHTML?: boolean,
    source?: string[] | number[] | ((this: CellProperties, query: string, callback: (items: string[]) => void) => void),
    trimDropdown?: boolean,
    visibleRows?: number
}

type NumericType = {
    type: 'numeric',
    pattern?: string,
    culture?: string
}

type SelectType = {
    type: 'select',
    selectOptions?: string[] | SelectOptionsObject | ((visualRow: number, visualColumn: number, prop: string | number) => string[] | SelectOptionsObject);
}

type TimeType = {
    type: 'time',
    correctFormat?: boolean
}