import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-answer-dialog',
  templateUrl: './app-answer-dialog.component.html',
  styleUrls: ['./app-answer-dialog.component.scss']
})
export class AppAnswerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AppAnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleClick() {
    this.dialogRef.close(this.data.answer);
  }

}
