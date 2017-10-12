import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TopicStoreService, QuoteStoreService } from '../../common/store';
import { Topic } from '../../common/models/topic.model';
import appConstants from '../../common/app-constants';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.scss']
})
export class NewQuoteComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = `${appConstants.ui.PAGE_CONTAINER_CLASS}`;
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
    private topicStoreService: TopicStoreService,
    private quoteStoreService: QuoteStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading$ = this.quoteStoreService.isLoading$;
    this.actionsSubscription = this.route.params
      .filter(params => !!params['topicId'])
      .subscribe(topicIdParams => {
        this.quote.topic = parseInt(topicIdParams['topicId'], 10);
        this.topicStoreService.get(this.quote.topic);
      });
    this.authors$ = this.quoteStoreService.authorSuggestions$;
    this.sources$ = this.quoteStoreService.sourceSuggestions$;
    this.topic$ = this.topicStoreService.currentTopic$;

    this.quoteStoreService.getSuggestions();
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  create() {
    this.quoteStoreService.create(this.quote);
  }
}
