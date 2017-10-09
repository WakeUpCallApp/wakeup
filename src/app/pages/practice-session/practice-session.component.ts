import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as reducers from "../../common/reducers";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as actions from "../../common/actions/question-set.actions";
import * as quoteActions from "../../common/actions/quote.actions";
import * as answerActions from "../../common/actions/answer.actions";

import { QuestionSet } from "../../common/models/question-set.model";
import { Quote } from "../../common/models/quote.model";
import appConstants from "../../common/app-constants";
import {
  SessionConfigService,
  SessionOptions
} from "../../common/services/session-config.service";
import { LoginApi } from '../../common/services/api/login.api';

@Component({
  selector: "wakeup-practice-session",
  templateUrl: "./practice-session.component.html",
  styleUrls: ["./practice-session.component.scss"]
})
export class PracticeSessionComponent implements OnInit, OnDestroy {
  displayQuestion = true;
  currentQuestionSet: QuestionSet;
  actionsSubscription: Subscription;
  qsSubscription: Subscription;
  currentQuestionIndex = 0;
  currentQuestion;
  currentQuote: Observable<Quote>;
  questionsNo: number;
  answerText: string;
  private configOptions: SessionOptions = <SessionOptions>{};
  private sessionTimer;
  private isSessionMode = false;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private sessionConfigService: SessionConfigService,
    private titleService: Title,
    private loginApi: LoginApi
  ) {
    this.configOptions =
      this.sessionConfigService.getOptions() || (<SessionOptions>{});
  }

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .filter(params => !!params['questionSetId'])
      .map(idParams => new actions.GetCurrentQSAction(idParams["questionSetId"]))
      .subscribe(this.store);

    this.qsSubscription = this.store
      .select(reducers.getCurrentQuestionSetState)
      .subscribe(currentQuestionSet => {
        this.currentQuestionSet = <QuestionSet>Object.assign({}, currentQuestionSet);
        this.titleService.setTitle(`${this.currentQuestionSet.name} practice`);
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
      });
    this.store.dispatch(new answerActions.OpenIndexedDbAction());
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.qsSubscription.unsubscribe();
  }

  canDeactivate() {
    if (this.isSessionMode) {
      return window.confirm("Are you sure? The session will terminate.");
    }

    return true;
  }

  setCurrentQuestion() {
    this.currentQuestion = this.currentQuestionSet.questions
      ? this.currentQuestionSet.questions[this.currentQuestionIndex]
      : {};

    if (this.currentQuestion.quote) {
      this.store.dispatch(
        new quoteActions.GetByIdAction(this.currentQuestion.quote)
      );
      this.currentQuote = this.store.select(reducers.getCurrentQuote);
    } else {
      this.currentQuote = null;
    }
    this.playQuestion();
  }

  endQuestionSet() {
    this.isSessionMode = false;
    clearTimeout(this.sessionTimer);
    this.store.dispatch(
      new actions.RegisterSessionAction(this.currentQuestionSet.id)
    );
    this.router.navigate([
      appConstants.routes.SESSION_DETAILS,
      this.currentQuestionSet.id,
      this.currentQuestionSet.name
    ]);
  }

  setNextQuestion() {
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
    const sound = new Audio("../../../assets/sounds/Bell-ding.mp3");
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
    this.store.dispatch(
      new answerActions.CreateAction({
        questionId: this.currentQuestion.id,
        text: this.answerText,
        date: new Date().getTime(),
        userId: this.loginApi.getCurrentUser()._id
      })
    );
    this.answerText = "";
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
