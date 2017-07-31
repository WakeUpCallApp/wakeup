import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'wakeup-answer-dialog',
  templateUrl: './wakeup-answer-dialog.component.html',
  styleUrls: ['./wakeup-answer-dialog.component.scss']
})
export class WakeupAnswerDialogComponent implements OnInit {
  answer;
  constructor( public dialogRef: MdDialogRef<WakeupAnswerDialogComponent>) { }

  ngOnInit() {
  }

  handleClick() {
    this.dialogRef.close(this.answer);
  }

}
