import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { MdDialog, MdDialogConfig } from '@angular/material';

import * as reducers from "../../common/reducers";
import * as quoteActions from "../../common/actions/quote.actions";
import * as actions from "../../common/actions/answer.actions";
import * as questionActions from "../../common/actions/question.actions";
import { Quote } from "../../common/models/quote.model";
import { Answer } from "../../common/models/answer.model";
import { Question } from "../../common/models/question.model";
import appConstants from "../../common/app-constants";
import { WakeupEditAnswerDialogComponent } from "./components/wakeup-edit-answer-dialog/wakeup-edit-answer-dialog.component";


@Component({
  selector: "wakeup-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.scss"]
})
export class AnswersComponent implements OnInit {
  question: Question;
  currentQuestionId;
  actionsSubscription: Subscription;
  questionSubscription: Subscription;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private dialog: MdDialog,
  ) {}

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .select<string>("questionId")
      .map(id => {
        this.currentQuestionId = id;
        return new questionActions.GetCurrentQuestion(+id);
      })
      .subscribe(this.store);
    this.questionSubscription = this.store
      .select(reducers.getCurrentQuestionState)
      .subscribe(question => {
        this.question = question;
        this.titleService.setTitle(`Answers ${question.text}`);
      });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.questionSubscription.unsubscribe();
  }

  editAnswer(answer) {
    const config: MdDialogConfig = {
      disableClose: false,
      width: "600px"
    };
    const dialogRef = this.dialog.open(
      WakeupEditAnswerDialogComponent,
      config
    );
    dialogRef.componentInstance.answer = Object.assign({}, answer);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new actions.UpdateAction(result));
      }
    });
  }

  deleteAnswer(answer) {
    this.store.dispatch(new actions.DeleteAction(answer.id));
  }
}
