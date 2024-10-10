import { ColDef } from 'ag-grid-community';


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
    disabled?: boolean;
    cellEditorParams?: boolean;
}

export type CellEditorType = {
    value: string,
    text: string,
    cellDataType: string,
    cellEditor: string,
}


export type ColumnDefinitionProperties = {
    key: string,
    header: string
}
