---
"export-to-file": minor
---

Add an optional `sheetName` parameter for xls/xlsx exports (defaults to "data", the previous hard-coded name). Also import `xlsx` via named imports so the ESM build no longer relies on a default export that xlsx's ESM entry doesn't provide.
