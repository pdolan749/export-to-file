# file-export

## 1.2.0

### Minor Changes

- 33babff: Add an optional `sheetName` parameter for xls/xlsx exports (defaults to "data", the previous hard-coded name). Also import `xlsx` via named imports so the ESM build no longer relies on a default export that xlsx's ESM entry doesn't provide.

## 1.0.2

### Patch Changes

- db74873: Updating README.md

## 1.0.1

### Patch Changes

- a1a8654: Adding the base functionality for exporting to CSV, XLS, and XLSX
