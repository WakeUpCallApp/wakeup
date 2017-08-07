import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "wakeup-quote-questions",
  templateUrl: "./wakeup-quote-questions.component.html",
  styleUrls: ["./wakeup-quote-questions.component.scss"]
})
export class WakeupQuoteQuestionsComponent implements OnInit {
  @Input() questions;
  @Output() update = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onRemove(questionToRemove) {
    const questions = this.questions.filter(
      question => question.id !== questionToRemove.id
    );
    this.update.emit(questions);
  }

  onAddQuestion(question) {}

  openQuestionsBrowser() {
    
  }
}
