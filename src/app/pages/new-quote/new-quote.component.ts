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
  styleUrls: ['./new-quote.component.scss'],
  host: {'class': 'pageContent'}
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
  isLoading$;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(reducers.getLoadingQuoteState);
    this.actionsSubscription = this.route.params
      .filter(params => !!params['topicId'])
      .subscribe(topicIdParams => {
        this.quote.topic = parseInt(topicIdParams["topicId"]);
        this.store.dispatch(new topicActions.GetCurrentTopicAction(this.quote.topic));
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
