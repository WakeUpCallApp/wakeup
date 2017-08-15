import { Injectable } from "@angular/core";
import * as Papa from "papaparse/papaparse.min.js";

@Injectable()
export class FileParsingService {
  constructor() {}

  parseCVS(file, callback, csvHeader?) {
    Papa.parse(file, {
      complete: callback,
      header: csvHeader,
      delimiter: ','
    });
  }

  unparseCVS(objectList, csvHeader) {
    return Papa.unparse(objectList, {
      header: csvHeader
    });
  }

  downloadCSV(csv, fileName) {
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", `${fileName}.csv`);
    tempLink.click();
  }
}
