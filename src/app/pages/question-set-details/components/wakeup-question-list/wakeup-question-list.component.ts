import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "wakeup-question-list",
  templateUrl: "./wakeup-question-list.component.html",
  styleUrls: ["./wakeup-question-list.component.scss"]
})
export class WakeupQuestionListComponent implements OnInit {
  @Input() questions;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  get checked() {
    return this.questions && this.questions.every(question => question.checked);
  }

  deleteQuestions() {
    this.delete.emit(this.questions.filter(question => question.checked));
  }

  editQuestion(question) {
    this.edit.emit(question);
  }

  get indeterminate() {
    return this.questions
      ? !this.checked &&
          this.questions.some(question => question.checked === true)
      : false;
  }

  toggleCheckAllQuestions() {
    if (this.questions.every(question => question.checked)) {
      this.questions.forEach(question => {
        question.checked = false;
      });
    } else {
      this.questions.forEach(question => {
        question.checked = true;
      });
    }
  }

  canDelete() {
    return this.questions
      ? this.questions.some(question => question.checked)
      : false;
  }

  getSelectedQuestions() {
    return (
      (this.questions && this.questions.filter(question => question.checked)) ||
      []
    );
  }
}
