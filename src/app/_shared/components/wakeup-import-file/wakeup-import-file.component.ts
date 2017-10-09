import { Component, OnInit} from "@angular/core";

@Component({
  selector: "wakeup-import-file",
  templateUrl: "./wakeup-import-file.component.html",
  styleUrls: ["./wakeup-import-file.component.scss"]
})
export class WakeupImportFileComponent implements OnInit {
  uploadFile;
  importSpinner;
  constructor() {}

  ngOnInit() {}

  fileChanged(e: Event) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    this.uploadFile(target.files);
  }
}
