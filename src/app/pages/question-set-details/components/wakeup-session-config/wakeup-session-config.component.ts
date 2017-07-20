import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { SessionOptions } from "../../../../common/services/session-config.service";
@Component({
  selector: 'wakeup-session-config',
  templateUrl: './wakeup-session-config.component.html',
  styleUrls: ['./wakeup-session-config.component.scss']
})
export class WakeupSessionConfigComponent implements OnInit {
  options: SessionOptions = {
    questionInterval: 0,
    repeatQS: false,
    shuffleQuestions: false
  };
  constructor(public dialogRef: MdDialogRef<WakeupSessionConfigComponent>
  ) { }

  ngOnInit() {
  }

  handleClick() {
    this.dialogRef.close(this.options);
  }

}
