import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-answer-dialog',
  templateUrl: './app-answer-dialog.component.html',
  styleUrls: ['./app-answer-dialog.component.scss']
})
export class AppAnswerDialogComponent implements OnInit {
  answer;
  constructor( public dialogRef: MatDialogRef<AppAnswerDialogComponent>) { }

  ngOnInit() {
  }

  handleClick() {
    this.dialogRef.close(this.answer);
  }

}
