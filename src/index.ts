import { saveAs } from "file-saver";
import XLSX from "xlsx";

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
  data: any[],
  fileName: string,
  exportType: ExportTypes
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
      blob = exportToXLSX(data);
      break;
    case "XLS":
      fileExtension = ".xls";
      blob = exportToXLS(data);
      break;
    default:
      return;
  }

  saveAs(blob, fileName + fileExtension);
}

const defaultExcelBuffer = (csvData: any[], isXLSX: boolean) => {
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  return XLSX.write(wb, { bookType: isXLSX ? "xlsx" : "xls", type: "array" });
};

const exportToXLSX = (csvData: any[]): Blob => {
  const type =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const excelBuffer = defaultExcelBuffer(csvData, true);
  return new Blob([excelBuffer], { type });
};

const exportToXLS = (csvData: any[]): Blob => {
  const type = "application/vnd.ms-excel";
  const excelBuffer = defaultExcelBuffer(csvData, false);
  return new Blob([excelBuffer], { type });
};

const exportToCsv = (csvData: any[]): Blob => {
  const type = "text/plain;charset=UTF-8";
  const ws = XLSX.utils.json_to_sheet(csvData);
  const csv = XLSX.utils.sheet_to_csv(ws);

  return new Blob([csv], { type });
};
