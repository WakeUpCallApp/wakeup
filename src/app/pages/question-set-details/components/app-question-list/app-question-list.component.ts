import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-question-list',
  templateUrl: './app-question-list.component.html',
  styleUrls: ['./app-question-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppQuestionListComponent implements OnInit {
  @Input() questions;
  @Input() canEdit;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() openQuotesBrowser = new EventEmitter();
  questionMenu;
  constructor() { }

  ngOnInit() { }
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

  openQuotes(question) {
    this.openQuotesBrowser.emit(question);
  }
}
