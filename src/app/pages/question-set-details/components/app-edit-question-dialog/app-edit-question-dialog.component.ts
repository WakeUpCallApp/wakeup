import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-question-dialog',
  templateUrl: './app-edit-question-dialog.component.html',
  styleUrls: ['./app-edit-question-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppEditQuestionDialogComponent implements OnInit {
  question;
  constructor(
    public dialogRef: MatDialogRef<AppEditQuestionDialogComponent>
  ) {}

  ngOnInit() {}

  handleClick() {
    this.dialogRef.close(this.question);
  }
}
