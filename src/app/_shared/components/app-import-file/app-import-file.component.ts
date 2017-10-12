import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-file',
  templateUrl: './app-import-file.component.html',
  styleUrls: ['./app-import-file.component.scss']
})
export class AppImportFileComponent implements OnInit {
  uploadFile;
  importSpinner;
  constructor() { }

  ngOnInit() { }

  fileChanged(e: Event) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    this.uploadFile(target.files);
  }
}
