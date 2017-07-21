import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as reducers from '../../common/reducers';
import * as questionActions from '../../common/actions/question.actions';
import * as actions from '../../common/actions/quote.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'wakeup-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.scss']
})
export class NewQuoteComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  authors$: Observable<string[]>;
  sources$: Observable<string[]>;

  quote = {
    author: '',
    text: '',
    source: '',
    questions: [],
    topic: -1
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
      });
    this.authors$ = this.store.select(reducers.getAuthorSuggestions);
    this.sources$ = this.store.select(reducers.getSourceSuggestions);

    this.store.dispatch(new actions.GetSuggestionsAction());
    this.store.dispatch(new questionActions.LoadAction());
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  create() {
    this.store.dispatch(new actions.CreateAction(this.quote));
  }
}
