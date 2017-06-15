import { Component, OnInit, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MdDialog, MdDialogConfig } from "@angular/material";
import { Store } from "@ngrx/store";
import "@ngrx/core/add/operator/select";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { WakeupQuotesBrowserComponent } from "./components/wakeup-quotes-browser/wakeup-quotes-browser.component";
import { QuestionSet } from "../../common/models/question-set.model";
import { IQuestion } from "../../common/models/question.model";
import * as reducers from "../../common/reducers";
import * as actions from "../../common/actions/question-set.actions";

@Component({
  selector: "wakeup-question-set-details",
  templateUrl: "./question-set-details.component.html",
  styleUrls: ["./question-set-details.component.scss"]
})
export class QuestionSetDetailsComponent implements OnInit {
  currentQuestionSet: QuestionSet;
  newQuestion: IQuestion;
  actionsSubscription: Subscription;
  qsSubscription: Subscription;
  updateObject;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MdDialog
  ) {}

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .select<string>("id")
      .map(id => new actions.GetCurrentQSAction(id))
      .subscribe(this.store);

    this.qsSubscription = this.store
      .select(reducers.getCurrentQuestionSetState)
      .subscribe(currentQuestionSet => {
        this.currentQuestionSet = Object.assign({}, currentQuestionSet);
        this.updateObject = Object.assign({}, currentQuestionSet);
        this.newQuestion = this.getEmptyQuestion();
      });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.qsSubscription.unsubscribe();
  }

  updateQuestionSet($event) {
    this.store.dispatch(new actions.UpdateAction(this.updateObject));
  }

  deleteQuestionSet() {
    this.store.dispatch(new actions.DeleteAction(this.currentQuestionSet.id));
  }

  getEmptyQuestion() {
    return {
      id: undefined,
      text: "",
      quote: undefined,
      questionSet: this.currentQuestionSet.id
    };
  }

  addQuestion(qs: IQuestion) {
    this.store.dispatch(
      new actions.AddQuestionAction({
        text: qs.text,
        questionSet: qs.questionSet,
        date: new Date().getTime(),
        quote: qs.quote
      })
    );
    this.newQuestion = this.getEmptyQuestion();
  }

  deleteQuestions(questions) {
    questions.forEach(question =>
      this.store.dispatch(new actions.DeleteQuestionAction(question.id))
    );
  }

  openQuotesBrowser(question) {
    let config: MdDialogConfig = {
      disableClose: false,
      width: "600px"
    };
    let dialogRef = this.dialog.open(WakeupQuotesBrowserComponent, config);
    dialogRef.afterClosed().subscribe(result => (question.quote = result));
  }

  editQuestion(question) {
   
  }
}
