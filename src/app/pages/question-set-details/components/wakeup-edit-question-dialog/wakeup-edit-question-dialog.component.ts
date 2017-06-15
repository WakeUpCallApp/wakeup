import { Component, OnInit } from "@angular/core";
import { MdDialogRef } from "@angular/material";

@Component({
  selector: "wakeup-wakeup-edit-question-dialog",
  templateUrl: "./wakeup-edit-question-dialog.component.html",
  styleUrls: ["./wakeup-edit-question-dialog.component.scss"]
})
export class WakeupEditQuestionDialogComponent implements OnInit {
  question;
  constructor(
    public dialogRef: MdDialogRef<WakeupEditQuestionDialogComponent>
  ) {}

  ngOnInit() {}

  handleClick() {
    this.dialogRef.close(this.question);
  }
}
