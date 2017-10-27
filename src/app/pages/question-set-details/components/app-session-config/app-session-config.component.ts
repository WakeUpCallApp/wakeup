import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SessionOptions } from '@app/common';
@Component({
  selector: 'app-session-config',
  templateUrl: './app-session-config.component.html',
  styleUrls: ['./app-session-config.component.scss']
})
export class AppSessionConfigComponent implements OnInit {
  options: SessionOptions = {
    questionInterval: 0,
    repeatQS: false,
    shuffleQuestions: false
  };
  constructor(public dialogRef: MatDialogRef<AppSessionConfigComponent>
  ) { }

  ngOnInit() {
  }

  handleClick() {
    this.dialogRef.close(this.options);
  }

}
