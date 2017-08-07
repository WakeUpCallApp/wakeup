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
        this.currentQuestionSet = questionSets[0];
      });
  }

  safeClose() {
    this.dialogRef.close();
  }

  toggleSelectedQuestion(question) {

  }
  isSelectedQuestion(question) {
    
  }
}
