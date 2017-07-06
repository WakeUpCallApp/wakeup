import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as reducers from "../../common/reducers";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as actions from "../../common/actions/question-set.actions";
import * as quoteActions from "../../common/actions/quote.actions";

import { QuestionSet } from "../../common/models/question-set.model";
import { Quote } from "../../common/models/quote.model";

@Component({
  selector: "wakeup-practice-session",
  templateUrl: "./practice-session.component.html",
  styleUrls: ["./practice-session.component.scss"]
})
export class PracticeSessionComponent implements OnInit {
  currentQuestionSet: QuestionSet;
  actionsSubscription: Subscription;
  qsSubscription: Subscription;
  currentQuestionIndex = 0;
  currentQuestion;
  currentQuote: Observable<Quote>;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .select<string>("questionSetId")
      .map(id => new actions.GetCurrentQSAction(id))
      .subscribe(this.store);

    this.qsSubscription = this.store
      .select(reducers.getCurrentQuestionSetState)
      .subscribe(currentQuestionSet => {
        this.currentQuestionSet = Object.assign({}, currentQuestionSet);
        
        this.currentQuestion = this.currentQuestionSet.questions
          ? this.currentQuestionSet.questions[this.currentQuestionIndex]
          : {};
        
        if (this.currentQuestion.quoteId) {
          this.store.dispatch(
            new quoteActions.GetByIdAction(this.currentQuestion.quoteId)
          );
          this.currentQuote = this.store.select(reducers.getCurrentQuote);
        }
      });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.qsSubscription.unsubscribe();
  }
}
