import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  HostBinding
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { takeUntil, filter, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatDialogConfig } from '@angular/material';


import { AppAnswerDialogComponent } from './components/app-answer-dialog/app-answer-dialog.component';

import {
  AnswerStoreService,
  QuestionStoreService,
  QuestionSet,
  DialogService,
  AuthTokenService
} from '@app/common';
import appConstants from '@app/common/app-constants';

enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = `${appConstants.ui.PAGE_CONTAINER_CLASS}`;
  question;
  currentQuestionId;
  nextQuestionId: number;
  prevQuestionId: number;
  openModal = false;
  isLoading$;
  answers;
  questionMenu;
  private componentDestroyed = new Subject();

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

    Observable.combineLatest(
      this.route.params,
      this.answerStoreService.isIndexedDbOpen$)
      .pipe(
      map(([params, isDbOpen]) => {
        this.currentQuestionId = +params.questionId;
        if (isDbOpen) {
          this.answerStoreService.getAnswers(this.currentQuestionId);
        }
        return this.currentQuestionId;
      }),
      tap(questionId => this.questionStoreService.getQuestion(questionId)),
      takeUntil(this.componentDestroyed))
      .subscribe();

    this.questionStoreService.currentQuestion$
      .pipe(takeUntil(this.componentDestroyed))
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
    this.answerStoreService.groupedAnswers$
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(answers => {
        if (answers.constructor === Array) {
          this.answers = answers;
        }
      });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  @HostListener('document:keyup', ['$event'])
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
      width: '600px',
      data: {
        answer: Object.assign({}, answer)
      }
    };
    const dialogRef = this.dialog.open(AppAnswerDialogComponent, config);

    dialogRef.afterClosed().subscribe(answerResult => {
      this.openModal = false;
      if (answerResult) {
        this.answerStoreService.update(answerResult);
      }
    });
  }
  onDeleteAnswer(answer) {
    this.dialogService.openDialog(
      'Are you sure you want to delete this answer?',
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
      text: ''
    };
    const config: MatDialogConfig = {
      disableClose: false,
      width: '600px',
      data: {
        answer: Object.assign({}, newAnswer)
      }
    };
    const dialogRef: any = this.dialog.open(AppAnswerDialogComponent, config);

    dialogRef.afterClosed().subscribe(answer => {
      this.openModal = false;
      if (answer) {
        this.answerStoreService.create(answer, this.auth.getUserInfo().id);
      }
    });
  }

  onDeleteQuestion() {
    this.dialogService.openDialog(
      'Are you sure you want to delete this question?',
      this.deleteQuestion.bind(this)
    );
  }

  private deleteQuestion() {
    this.questionStoreService.deleteQuestion(this.question);
  }

  onDeleteAnswers() {
    this.dialogService.openDialog(
      'Are you sure you want to delete all answers?',
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
