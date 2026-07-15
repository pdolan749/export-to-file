import { saveAs } from "file-saver";
import { utils, write } from "xlsx";

export type ExportTypes =
  | "CSV"
  | "EXCEL"
  | "csv"
  | "excel"
  | "xls"
  | "XLS"
  | "XLSX"
  | "xlsx";

export default function exportTo(
  data: unknown[],
  fileName: string,
  exportType: ExportTypes,
  sheetName = "data"
) {
  let fileExtension = "";
  let blob: Blob;

  switch (exportType.toUpperCase()) {
    case "CSV":
      fileExtension = ".csv";
      blob = exportToCsv(data);
      break;
    case "XLSX":
    case "EXCEL":
      fileExtension = ".xlsx";
      blob = exportToXLSX(data, sheetName);
      break;
    case "XLS":
      fileExtension = ".xls";
      blob = exportToXLS(data, sheetName);
      break;
    default:
      return;
  }

  saveAs(blob, fileName + fileExtension);
}

const defaultExcelBuffer = (
  csvData: unknown[],
  isXLSX: boolean,
  sheetName: string
) => {
  const ws = utils.json_to_sheet(csvData);
  const wb = { Sheets: { [sheetName]: ws }, SheetNames: [sheetName] };
  return write(wb, { bookType: isXLSX ? "xlsx" : "xls", type: "array" });
};

const exportToXLSX = (csvData: unknown[], sheetName: string): Blob => {
  const type =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const excelBuffer = defaultExcelBuffer(csvData, true, sheetName);
  return new Blob([excelBuffer], { type });
};

const exportToXLS = (csvData: unknown[], sheetName: string): Blob => {
  const type = "application/vnd.ms-excel";
  const excelBuffer = defaultExcelBuffer(csvData, false, sheetName);
  return new Blob([excelBuffer], { type });
};

const exportToCsv = (csvData: unknown[]): Blob => {
  const type = "text/plain;charset=UTF-8";
  const ws = utils.json_to_sheet(csvData);
  const csv = utils.sheet_to_csv(ws);

  return new Blob([csv], { type });
};
