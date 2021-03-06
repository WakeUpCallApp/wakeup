import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import appConstants from '@app/common/app-constants';

import {
  AnswerStoreService,
  QuestionSetStoreService,
  QuoteStoreService,
  LoginApi,
  SessionConfigService,
  SessionOptions,
  QuestionSet,
  Quote,
} from '@app/common';

@Component({
  selector: 'app-practice-session',
  templateUrl: './practice-session.component.html',
  styleUrls: ['./practice-session.component.scss'],
})
export class PracticeSessionComponent implements OnInit, OnDestroy {
  displayQuestion = true;
  currentQuestionSet: QuestionSet;
  currentQuestionIndex = 0;
  currentQuestion;
  currentQuote: Observable<Quote>;
  questionsNo: number;
  answerText: string;
  private configOptions: SessionOptions = <SessionOptions>{};
  private sessionTimer;
  private isSessionMode = false;
  private componentDestroyed = new Subject();
  constructor(
    private questionSetStoreService: QuestionSetStoreService,
    private quoteStoreService: QuoteStoreService,
    private answerStoreService: AnswerStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionConfigService: SessionConfigService,
    private titleService: Title,
    private loginApi: LoginApi
  ) {
    this.configOptions =
      this.sessionConfigService.getOptions() || <SessionOptions>{};
  }

  ngOnInit() {
    this.answerStoreService.openIndexedDb();

    this.route.params
      .pipe(
        map(params => params),
        tap(params => this.questionSetStoreService.get(params.questionSetId)),
        takeUntil(this.componentDestroyed)
      )
      .subscribe();

    this.questionSetStoreService.currentQuestionSet$
      .pipe(take(2))
      .subscribe(currentQuestionSet => {
        this.currentQuestionSet = <QuestionSet>{ ...currentQuestionSet };
        this.titleService.setTitle(`${this.currentQuestionSet.name} practice`);
        this.initSession();
      });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }
  }

  canDeactivate() {
    if (this.isSessionMode) {
      return window.confirm('Are you sure? The session will terminate.');
    }

    return true;
  }

  initSession() {
    this.questionsNo = this.currentQuestionSet.questions
      ? this.currentQuestionSet.questions.length
      : 0;
    if (
      this.configOptions &&
      this.configOptions.shuffleQuestions &&
      this.questionsNo
    ) {
      this.currentQuestionSet.questions = this.shuffle(
        this.currentQuestionSet.questions
      );
    }
    this.setCurrentQuestion();
    this.isSessionMode = true;
  }

  setCurrentQuestion() {
    this.currentQuestion = this.currentQuestionSet.questions
      ? this.currentQuestionSet.questions[this.currentQuestionIndex]
      : {};

    if (this.currentQuestion.quote) {
      this.quoteStoreService.getById(this.currentQuestion.quote);
      this.currentQuote = this.quoteStoreService.currentQuote$;
    } else {
      this.currentQuote = null;
    }
    this.playQuestion();
  }

  endQuestionSet() {
    this.isSessionMode = false;
    clearTimeout(this.sessionTimer);
    this.questionSetStoreService.registerSession(this.currentQuestionSet);
    this.router.navigate([
      appConstants.routes.SESSION_DETAILS,
      this.currentQuestionSet.id,
      this.currentQuestionSet.name,
    ]);
  }

  setNextQuestion() {
    this.answerText = '';
    if (
      this.currentQuestionIndex >= 0 &&
      this.currentQuestionIndex < this.questionsNo - 1
    ) {
      this.displayQuestion = false;
      this.setQuestionTimeout(() => {
        this.currentQuestionIndex++;
        this.setCurrentQuestion();
      });
    } else {
      if (this.configOptions.repeatQS) {
        this.displayQuestion = false;
        this.setQuestionTimeout(() => {
          this.resetQuestionSet();
        });
      } else {
        this.endQuestionSet();
      }
    }
  }

  playQuestion() {
    this.displayQuestion = true;
    const sound = new Audio('../../../assets/sounds/Bell-ding.mp3');
    sound.volume = 0.2;
    sound.play();
  }

  setQuestionTimeout(callback) {
    this.sessionTimer = setTimeout(() => {
      callback();
    }, this.configOptions.questionInterval * 60 * 1000);
  }

  resetQuestionSet() {
    this.currentQuestionIndex = 0;
    this.setCurrentQuestion();
    if (
      this.configOptions &&
      this.configOptions.shuffleQuestions &&
      this.questionsNo
    ) {
      this.currentQuestionSet.questions = this.shuffle(
        this.currentQuestionSet.questions
      );
    }
  }

  saveAnswer() {
    this.answerStoreService.create(
      {
        questionId: this.currentQuestion.id,
        text: this.answerText,
      },
      this.loginApi.getCurrentUser()._id
    );
    this.answerText = '';
    this.setNextQuestion();
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
