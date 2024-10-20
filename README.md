# Directus AG-Grid Interface Extension

This Directus interface extension integrates **AG-Grid** functionality into Directus, allowing for dynamic data grids with column configuration and JSON-based data persistence. This extension has been tested on **Directus version 10.12.1**.

## Features

- **AG-Grid Integration**: Provides a flexible grid interface powered by AG-Grid.
- **Column Configurations Interface**: UI for creating and editing column settings
- **Cell Types**: Supports the following data types:
  - `Boolean`
  - `Date String`
  - `Select`
  - `Number`
  - `Text`
  - `Large Text`
  - **Custom Type**: `Current User` (a non-editable field that automatically sets the current user's first and last name)
- **Data Storage**: Data is saved as a JSON object.

## Screens

<figure>
    <figurecaption>Interface definitions</figurecaption>
    <img src="https://raw.githubusercontent.com/veryphatic/directus-extension-ag-grid-interface/main/screens/interface-definitions.png" />
</figure>
<figure>
    <figurecaption>Column configuration</figurecaption>
    <img src="https://raw.githubusercontent.com/veryphatic/directus-extension-ag-grid-interface/main/screens/configuration-1.png" />
    <img src="https://raw.githubusercontent.com/veryphatic/directus-extension-ag-grid-interface/main/screens/configuration-2.png" />
</figure>
<figure>
    <figurecaption>Grid</figurecaption>
    <img src="https://raw.githubusercontent.com/veryphatic/directus-extension-ag-grid-interface/main/screens/ag-grid.png" />
</figure>

## Installation

1. Download or clone this repository to your Directus extensions folder:
   ```
   git clone https://github.com/veryphatic/directus-ag-grid-extension.git
   ```

2. Ensure that the folder is placed in the correct location for Directus extensions:
   ```
   /extensions/interfaces/ag-grid-interface
   ```

3. Restart your Directus server to load the extension.

## Usage

Once installed, you can configure a field in Directus to use this AG-Grid interface. The grid allows for customizable column settings where users can add expressions and control cell functionality. Data is persisted as a JSON object in the field.

### Cell Types

- **Boolean**: A checkbox field representing true/false values.
- **Date String**: A string that captures a date.
- **Select**: Dropdown options for selecting predefined values.
- **Number**: A numeric input field.
- **Text**: Standard text input.
- **Large Text**: A multi-line text field.
- **Current User**: A special cell type that automatically populates the current user's full name (non-editable).

## Limitations

- Not all column configurations are fully implemented (some expressions or functions may not be available yet).

## Contributing

Feel free to fork this repository, open issues, or submit pull requests. Contributions to improve functionality or fix issues are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Let me know if you need any additional details!