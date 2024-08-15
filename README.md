# File Export for Node

Simple export utility that will export to CSV, XLS, and XLSX formats.

## Installation

```bash
npm install export-to-file
```

## Usage

To use the export-to-file utility, import it into your JavaScript file:

```javascript
import exportToFile from "export-to-file";
```

### Export

To export data to CSV format, use the `exportToFile` function:

```javascript
exportToFile(data, filename, exportType);
```

- `data` (required): The data to be exported.
- `filename` (required): The name of the exported file.
- `exportType` (required): The file ending for the file.
  - "CSV", "csv", "EXCEL", "excel", "xls", "XLS", "XLSX", "xlsx"

## Example

Here's an example of how to use the export-to-file utility:

```javascript
import exportToFile from "export-to-file";

const data = [
  ["Name", "Age", "Email"],
  ["John Doe", 30, "john@example.com"],
  ["Jane Smith", 25, "jane@example.com"],
];

exportToFile(data, "users", "CSV");
```

This will export the `data` array to a CSV file named `users.csv`.
