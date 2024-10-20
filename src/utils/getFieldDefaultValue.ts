export function getDefaultValue(cellEditor: string, currentUser: string) {
    let value = null;
    console.log("type", cellEditor);
    switch (cellEditor) {
        case "agTextCellEditor":
        case "agLargeTextCellEditor":
            value = "";
            break;
        case "agNumberCellEditor":
            value = 0;
            break;
        case "agCheckboxCellEditor":
            value = false;
            break;
        case "agDateCellEditor":
        case "agDateStringCellEditor":
            value = null; // this makes for bad ui -> new Date().toISOString();
            break;
        case "agSelectCellEditor":
            value = "";
            break;
        case "SystemUserEditor":
            value = `${currentUser?.first_name} ${currentUser?.last_name ?? ''}`;
            break;
        default:
            break;
    }

    return value;
}