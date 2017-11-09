import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-question-dialog',
  templateUrl: './app-edit-question-dialog.component.html',
  styleUrls: ['./app-edit-question-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppEditQuestionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AppEditQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  handleClick() {
    this.dialogRef.close(this.data.question);
  }
}
