import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'wakeup-answer-dialog',
  templateUrl: './wakeup-answer-dialog.component.html',
  styleUrls: ['./wakeup-answer-dialog.component.scss']
})
export class WakeupAnswerDialogComponent implements OnInit {
  answer;
  constructor( public dialogRef: MatDialogRef<WakeupAnswerDialogComponent>) { }

  ngOnInit() {
  }

  handleClick() {
    this.dialogRef.close(this.answer);
  }

}
