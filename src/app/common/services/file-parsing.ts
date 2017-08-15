import { Injectable } from "@angular/core";
import * as Papa from "papaparse/papaparse.min.js";

@Injectable()
export class FileParsingService {
  constructor() {}

  parseCVS(file, callback) {
    Papa.parse(file, {
      complete: callback
    });
  }
}
