## WHERE AM I

[] disable the save button if the form isn't valid (show a error message when clicked and the form isn't valid)
[] add delete button

## TODO

[] rearrange the key to be at the top
[] make the key not editable when editing an existing configuration
[] fix up the tsc linting
[] add code formatter

[x] create state for the form
[x] decide: when user changes field type do you
    [yes] drop everything to the floor
    [no] save the state so it can be restored
[x] add code formatter for `code` field types
[x] plug in the update event from the ColumnDefinitionEditorDrawer inside `InterfaceOptions/onUpdateColumnDefinition`

## Notes

[] I don't like the way the columnDefinitionForm is composed; make it a dummy component that can create an empty model given the values, as well as accept a previously saved set of values. The component should always emit on change, or on create (if no state provided)



# Component definition

## Options

- add new columns
    - select type: checkbox, date, dropdown, numeric, select, time, text
    - default value: (any above option) + formula
        - numbers have default value of 0
    - heading

- rows
    - default number of rows
    - allow adding new row

- generator
    - generate default rows from select

- preview


## interface

- export as csv


# Scratch

```js
const options = { 
    licence: "",
    columns: [
        {
            header: '',
            type: '',
            defaultValue: '',
            ...otherTypeProps
        }
    ]

}
```

```json
{
    "fields": [
        {
            "field": "name",
            "name": "name",
            "type": "string",
            "meta": {
                "field": "name",
                "width": "half",
                "type": "string",
                "interface": "input",
                "options": {
                    "placeholder": "what is your name?"
                }
            }
        },
        {
            "field": "city",
            "name": "city",
            "type": "string",
            "meta": {
                "field": "city",
                "width": "half",
                "type": "string",
                "interface": "input",
                "options": {
                    "placeholder": "What city do you live in?"
                }
            }
        },
        {
            "field": "profession",
            "name": "profession",
            "type": "string",
            "meta": {
                "field": "profession",
                "width": "half",
                "type": "string",
                "note": "Some note",
                "interface": "input",
                "options": {
                    "placeholder": "What is your profession?"
                }
            }
        }
    ]
}
```