import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'wakeup-edit-answer-dialog',
  templateUrl: './wakeup-edit-answer-dialog.component.html',
  styleUrls: ['./wakeup-edit-answer-dialog.component.scss']
})
export class WakeupEditAnswerDialogComponent implements OnInit {
  answer;
  constructor( public dialogRef: MdDialogRef<WakeupEditAnswerDialogComponent>) { }

  ngOnInit() {
  }

  handleClick() {
    this.dialogRef.close(this.answer);
  }

}
