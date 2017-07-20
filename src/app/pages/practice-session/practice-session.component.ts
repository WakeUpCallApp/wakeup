import { Component, OnInit } from "@angular/core";
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
import { SessionConfigService, SessionOptions } from "../../common/services/session-config.service";

@Component({
  selector: "wakeup-practice-session",
  templateUrl: "./practice-session.component.html",
  styleUrls: ["./practice-session.component.scss"]
})
export class PracticeSessionComponent implements OnInit {
  displayQuestion: boolean = true;
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
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private sessionConfigService: SessionConfigService
  ) {
    this.configOptions = this.sessionConfigService.getOptions() || <SessionOptions>{};
  }

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .select<string>("questionSetId")
      .map(id => new actions.GetCurrentQSAction(id))
      .subscribe(this.store);

    this.qsSubscription = this.store
      .select(reducers.getCurrentQuestionSetState)
      .subscribe(currentQuestionSet => {
        this.currentQuestionSet = Object.assign({}, currentQuestionSet);
        this.questionsNo = this.currentQuestionSet.questions ? this.currentQuestionSet.questions.length : 0;
        if (this.configOptions && this.configOptions.shuffleQuestions && this.questionsNo) {
          this.currentQuestionSet.questions = this.shuffle(this.currentQuestionSet.questions);
        }
        this.setCurrentQuestion();
      });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.qsSubscription.unsubscribe();
  }

  setCurrentQuestion() {
    this.currentQuestion = this.currentQuestionSet.questions
      ? this.currentQuestionSet.questions[this.currentQuestionIndex]
      : {};

    if (this.currentQuestion.quoteId) {
      this.store.dispatch(
        new quoteActions.GetByIdAction(this.currentQuestion.quoteId)
      );
      this.currentQuote = this.store.select(reducers.getCurrentQuote);
    }
    else {
      this.currentQuote = null;
    }
    this.playQuestion();
  }

  endQuestionSet() {
    clearTimeout(this.sessionTimer);
    this.router.navigate([appConstants.routes.QUESTION_SET_DETAILS, this.currentQuestionSet.id])
  }

  setNextQuestion() {
    if (this.currentQuestionIndex >= 0 &&
      this.currentQuestionIndex < this.questionsNo - 1) {
      this.displayQuestion = false;
      this.setQuestionTimeout(() => {
        this.currentQuestionIndex++;
        this.setCurrentQuestion();
      });
    }
    else {
      if (this.configOptions.repeatQS) {
        this.displayQuestion = false;
        this.setQuestionTimeout(() => {
          this.resetQuestionSet();
        });
      }
      else {
        this.endQuestionSet();
      }
    }
  }

  playQuestion() {
    this.displayQuestion = true;
    var sound = new Audio("../../../assets/sounds/Bell-ding.mp3");
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
    if (this.configOptions && this.configOptions.shuffleQuestions && this.questionsNo) {
      this.currentQuestionSet.questions = this.shuffle(this.currentQuestionSet.questions);
    }
  }

  saveAnswer() {
    this.store.dispatch(new answerActions.CreateAction({
      question: this.currentQuestion.id,
      text: this.answerText
    }));
    this.answerText = '';
    this.setNextQuestion();
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue, randomIndex;

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
