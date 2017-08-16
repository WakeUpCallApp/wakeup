import { Component, OnInit } from "@angular/core";
import { MdDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import * as reducers from "../../../../common/reducers";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as actions from "../../../../common/actions/question.actions";

@Component({
  selector: "wakeup-questions-browser",
  templateUrl: "./wakeup-questions-browser.component.html",
  styleUrls: ["./wakeup-questions-browser.component.scss"]
})
export class WakeupQuestionsBrowserComponent implements OnInit {
  allQuestionsSubscription: Subscription;
  questionSets;
  currentQuestionSet;
  selectedQuestions;
  constructor(
    private store: Store<reducers.State>,
    public dialogRef: MdDialogRef<WakeupQuestionsBrowserComponent>
  ) {}

  ngOnInit() {
    this.store.dispatch(new actions.LoadAction());
    this.allQuestionsSubscription = this.store
      .select(reducers.getQuestionsState)
      .subscribe(questionSets => {
        this.questionSets = questionSets;
        if (questionSets) {
          this.currentQuestionSet = this.getCurrentQuestionSet();
        }
      });
  }

  safeClose() {
    this.dialogRef.close(this.selectedQuestions);
  }

  toggleSelectedQuestion(question) {
    if (this.isSelectedQuestion(question)) {
      this.selectedQuestions = this.selectedQuestions.filter(
        q => q.id !== question.id
      );
    } else {
      this.selectedQuestions = [...this.selectedQuestions, question];
    }
  }

  isSelectedQuestion(question) {
    return this.selectedQuestions.find(q => q.id === question.id);
  }

  getCurrentQuestionSet() {
    const selectedIds = this.selectedQuestions.map(question => question.id);
    const questionSet = this.questionSets.find(
      qs =>
        qs.questions.find(q => selectedIds.indexOf(q.id) !== -1) !== undefined
    );
    return questionSet
      ? questionSet
      : this.questionSets.length ? this.questionSets[0] : {};
  }
}
