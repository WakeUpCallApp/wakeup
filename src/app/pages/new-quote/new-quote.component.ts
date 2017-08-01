import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as reducers from '../../common/reducers';
import * as actions from '../../common/actions/quote.actions';
import * as topicActions from '../../common/actions/topic.actions';
import { Topic } from '../../common/models/topic.model';

@Component({
  selector: 'wakeup-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.scss']
})
export class NewQuoteComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  authors$: Observable<string[]>;
  sources$: Observable<string[]>;
  topic$: Observable<Topic>;
  quote = {
    author: '',
    text: '',
    source: '',
    questions: [],
    topic: -1,
    date: undefined
  };
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .select<string>('topidId')
      .subscribe(topicId => {
        this.quote.topic = +topicId;
        this.store.dispatch(new topicActions.GetCurrentTopicAction(+topicId));
      });
    this.authors$ = this.store.select(reducers.getAuthorSuggestions);
    this.sources$ = this.store.select(reducers.getSourceSuggestions);
    this.topic$ = this.store.select(reducers.getCurrentTopicState);

    this.store.dispatch(new actions.GetSuggestionsAction());
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  create() {
    this.quote.date = new Date();
    this.store.dispatch(new actions.CreateAction(this.quote));
  }
}
