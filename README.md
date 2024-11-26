# PKPass Generator

Node.js/Express implementation for generating `.pkpass` files.

## Author

| Author         |
|----------------|
| Irving Aguilar |

## Usage

The project was developed using Node.js `v20.14.0`.

### Pre-requisites

You should run the following command on your preferred terminal in order to install all the project dependencies:

```bash
$ npm i
```

### Execution

```bash
$ node main.js
```
### Request Example

- **URL:** localhost:3000/generate-pass
- **METHOD:** POST
- **REQUEST:**
    ```json
    {
      "organizationName": "Apple Inc.",
      "description": "Apple Wallet Pass Demo",
      "logoText": "Wallet Pass",
      "serialNumber": "123456",
      "headerField": [
        {
          "key": "header",
          "label": "Header Field",
          "value": "Test"
        }
      ],
      "primaryField": [
        {
          "key": "member",
          "label": "Member",
          "value": "Irving Aguilar"
        }
      ],
      "secondaryField": [
        {
          "key": "subtitle",
          "label": "Member Since",
          "value": "2024"
        }
      ],
      "auxiliaryField": [
        {
          "key": "level",
          "label": "Level",
          "value": "Gold"
        },
        {
          "key": "side",
          "label": "Test",
          "value": "Test",
          "textAlignment": "PKTextAlignmentRight"
        }
      ],
      "qrContent": "https://www.google.com",
      "foregroundColor": "rgb(255, 255, 255)",
      "backgroundColor": "rgb(0, 66, 141)"
    }
    ```


