import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'wakeup-edit-question-dialog',
  templateUrl: './wakeup-edit-question-dialog.component.html',
  styleUrls: ['./wakeup-edit-question-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WakeupEditQuestionDialogComponent implements OnInit {
  question;
  constructor(
    public dialogRef: MatDialogRef<WakeupEditQuestionDialogComponent>
  ) {}

  ngOnInit() {}

  handleClick() {
    this.dialogRef.close(this.question);
  }
}
