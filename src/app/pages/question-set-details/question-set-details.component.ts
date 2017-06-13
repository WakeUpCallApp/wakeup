import { Component, OnInit } from "@angular/core";
import "@ngrx/core/add/operator/select";

import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionSet } from "../../common/models/question-set.model";
import * as reducers from "../../common/reducers";
import * as actions from "../../common/actions/question-set.actions";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "wakeup-question-set-details",
  templateUrl: "./question-set-details.component.html",
  styleUrls: ["./question-set-details.component.scss"]
})
export class QuestionSetDetailsComponent implements OnInit {
  currentQuestionSet: QuestionSet;
  newQuestion: string;
  actionsSubscription: Subscription;
  qsSubscription: Subscription;
  updateObject;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router
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
      });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.qsSubscription.unsubscribe();
  }

  get checked() {
    return (
      this.currentQuestionSet.questions &&
      this.currentQuestionSet.questions.every(question => question.checked)
    );
  }

  get indeterminate() {
    return this.currentQuestionSet.questions
      ? !this.checked &&
          this.currentQuestionSet.questions.some(question => question.checked === true)
      : false;
  }

  addQuestion() {
    this.store.dispatch(
      new actions.AddQuestionAction({
        text: this.newQuestion,
        questionSet: this.currentQuestionSet.id,
        date: new Date().getTime()
      })
    );
    this.newQuestion = "";
  }

  updateQuestionSet($event) {
    this.store.dispatch(new actions.UpdateAction(this.updateObject));
  }

  deleteQuestionSet() {
    this.store.dispatch(new actions.DeleteAction(this.currentQuestionSet.id));
  }

  toggleCheckAllQuestions() {
    const questions = this.currentQuestionSet.questions;
    if (questions.every(question => question.checked)) {
      questions.forEach(question => {
        question.checked = false;
      });
    } else {
      questions.forEach(question => {
        question.checked = true;
      });
    }
  }

  canDelete() {
    return this.currentQuestionSet.questions
      ? this.currentQuestionSet.questions.some(question => question.checked)
      : false;
  }

  getSelectedQuestions() {
    return (
      (this.currentQuestionSet.questions &&
        this.currentQuestionSet.questions.filter(question => question.checked)) || []);
  }
}
