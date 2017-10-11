import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { MatDialog, MatDialogConfig } from "@angular/material";

import appConstants from "../../common/app-constants";
import { WakeupAnswerDialogComponent } from "./components/wakeup-answer-dialog/wakeup-answer-dialog.component";
import { DialogService, AuthTokenService } from "../../common/services";
import {
  AnswerStoreService,
  QuestionStoreService
} from '../../common/store';
import { QuestionSet } from '../../common/models';

enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: "wakeup-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.scss"],
  host: { 'class': 'pageContent' }
})
export class AnswersComponent implements OnInit {
  question;
  currentQuestionId;
  actionsSubscription: Subscription;
  currentQuestionSubscription: Subscription;
  groupedAnswersSubscription: Subscription;
  nextQuestionId: number;
  prevQuestionId: number;
  openModal = false;
  isLoading$;
  answers;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private auth: AuthTokenService,
    private answerStoreService: AnswerStoreService,
    private questionStoreService: QuestionStoreService
  ) { }

  ngOnInit() {
    this.isLoading$ = this.answerStoreService.isLoading$;
    this.answerStoreService.openIndexedDb();
    this.actionsSubscription =
      Observable.combineLatest(
        this.route.params.filter(params => !!params["questionId"]),
        this.answerStoreService.isIndexedDbOpen$,
        ((idParams, isDbOpen) => {
          this.currentQuestionId = idParams["questionId"];
          if (isDbOpen) {
            this.answerStoreService.getAnswers(+this.currentQuestionId);
          }
          this.questionStoreService.getQuestion(+idParams["questionId"]);
        })).subscribe();

    this.currentQuestionSubscription = this.questionStoreService.currentQuestion$
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
    this.groupedAnswersSubscription = this.answerStoreService.groupedAnswers$
      .subscribe(answers => {
        if (answers.constructor === Array) {
          this.answers = answers;
        }
      });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.currentQuestionSubscription.unsubscribe();
    this.groupedAnswersSubscription.unsubscribe();
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
    const config: MatDialogConfig = {
      disableClose: false,
      width: "600px"
    };
    const dialogRef = this.dialog.open(WakeupAnswerDialogComponent, config);
    dialogRef.componentInstance.answer = Object.assign({}, answer);
    dialogRef.afterClosed().subscribe(answer => {
      this.openModal = false;
      if (answer) {
        this.answerStoreService.update(answer);
      }
    });
  }
  onDeleteAnswer(answer) {
    this.dialogService.openDialog(
      "Are you sure you want to delete this answer?",
      () => this.deleteAnswer.call(this, answer)
    );
  }
  private deleteAnswer(answer) {
    this.answerStoreService.delete(answer);
  }

  createAnswer() {
    this.openModal = true;
    const newAnswer = {
      questionId: +this.currentQuestionId,
      text: ""
    };
    const config: MatDialogConfig = {
      disableClose: false,
      width: "600px"
    };
    const dialogRef: any = this.dialog.open(WakeupAnswerDialogComponent, config);
    dialogRef.componentInstance.answer = Object.assign({}, newAnswer);
    dialogRef.afterClosed().subscribe(answer => {
      this.openModal = false;
      if (answer) {
        this.answerStoreService.create(answer, this.auth.getUserInfo().id);
      }
    });
  }

  onDeleteQuestion() {
    this.dialogService.openDialog(
      "Are you sure you want to delete this question?",
      this.deleteQuestion.bind(this)
    );
  }

  private deleteQuestion() {
    this.questionStoreService.deleteQuestion(this.question);
  }

  onDeleteAnswers() {
    this.dialogService.openDialog(
      "Are you sure you want to delete all answers?",
      this.deleteAnswers.bind(this)
    );
  }

  private deleteAnswers() {
    this.answerStoreService.deleteAll(+this.currentQuestionId, this.auth.getUserInfo().id);
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
