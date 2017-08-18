import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { MdDialog, MdDialogConfig } from "@angular/material";

import * as reducers from "../../common/reducers";
import * as quoteActions from "../../common/actions/quote.actions";
import * as actions from "../../common/actions/answer.actions";
import * as questionActions from "../../common/actions/question.actions";
import { Quote } from "../../common/models/quote.model";
import { Answer } from "../../common/models/answer.model";
import { Question } from "../../common/models/question.model";
import { QuestionSet } from "../../common/models/question-set.model";
import appConstants from "../../common/app-constants";
import { WakeupAnswerDialogComponent } from "./components/wakeup-answer-dialog/wakeup-answer-dialog.component";

enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

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
  nextQuestionId: number;
  prevQuestionId: number;
  openModal = false;
  isLoading$;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private dialog: MdDialog
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(reducers.getLoadingQuestionState);
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
        if (this.question.questionSet) {
          const currentQuestionIndex = (this.question
            .questionSet as QuestionSet).questionIds.indexOf(question.id);
          this.nextQuestionId = this.getNextQuestion(currentQuestionIndex);
          this.prevQuestionId = this.getPrevQuestion(currentQuestionIndex);
        }
      });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.questionSubscription.unsubscribe();
  }

  @HostListener("document:keyup", ["$event"])
  onKeyUp(ev: KeyboardEvent) {
    if (this.openModal) {
      return;
    }
    if (ev.keyCode === KEY_CODE.RIGHT_ARROW && this.nextQuestionId) {
      this.router.navigate([appConstants.routes.ANSWERS, this.nextQuestionId]);
    }

    if (ev.keyCode === KEY_CODE.LEFT_ARROW && this.prevQuestionId) {
      this.router.navigate([appConstants.routes.ANSWERS, this.prevQuestionId]);
    }
  }

  editAnswer(answer) {
    this.openModal = true;
    const config: MdDialogConfig = {
      disableClose: false,
      width: "600px"
    };
    const dialogRef = this.dialog.open(WakeupAnswerDialogComponent, config);
    dialogRef.componentInstance.answer = Object.assign({}, answer);
    dialogRef.afterClosed().subscribe(result => {
      this.openModal = false;
      if (result) {
        this.store.dispatch(new actions.UpdateAction(result));
      }
    });
  }

  deleteAnswer(answer) {
    this.store.dispatch(new actions.DeleteAction(answer.id));
  }

  createAnswer() {
    this.openModal = true;
    const newAnswer = {
      question: this.currentQuestionId,
      text: ""
    };
    const config: MdDialogConfig = {
      disableClose: false,
      width: "600px"
    };
    const dialogRef = this.dialog.open(WakeupAnswerDialogComponent, config);
    dialogRef.componentInstance.answer = Object.assign({}, newAnswer);
    dialogRef.afterClosed().subscribe(result => {
      this.openModal = false;
      if (result) {
        this.store.dispatch(
          new actions.CreateAction(
            Object.assign({}, newAnswer, result, {
              date: new Date().getTime()
            })
          )
        );
      }
    });
  }

  deleteQuestion() {
    this.store.dispatch(new questionActions.DeleteAction(this.question));
  }

  deleteAnswers() {
    this.store.dispatch(new actions.DeleteAllAction(this.currentQuestionId));
  }

  getPrevQuestion(currentQuestionId): number {
    return (this.question.questionSet as QuestionSet).questionIds[
      currentQuestionId - 1
    ];
  }

  getNextQuestion(currentQuestionId): number {
    return (this.question.questionSet as QuestionSet).questionIds[
      currentQuestionId + 1
    ];
  }
}
