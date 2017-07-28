import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as reducers from '../../common/reducers';
import * as quoteActions from '../../common/actions/quote.actions';
import * as actions from '../../common/actions/answer.actions';
import * as questionActions from '../../common/actions/question.actions';
import { Quote } from '../../common/models/quote.model';
import { Answer } from '../../common/models/answer.model';
import { Question } from '../../common/models/question.model';
import appConstants from '../../common/app-constants';

@Component({
  selector: 'wakeup-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  question$: Observable<Question>;
  currentQuestionId;
  actionsSubscription: Subscription;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.actionsSubscription = this.route.params
    .select<string>('questionId')
    .map(id => {
      this.currentQuestionId = id;
      return new questionActions.GetCurrentQuestion(+id);
    })
    .subscribe(this.store);
    this.question$ = this.store.select(reducers.getCurrentQuestionState);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
