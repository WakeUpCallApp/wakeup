import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Topic, Quote, QuoteStoreService } from '@app/common';

@Component({
  selector: 'app-quotes-browser',
  templateUrl: './app-quotes-browser.component.html',
  styleUrls: ['./app-quotes-browser.component.scss']
})
export class AppQuotesBrowserComponent implements OnInit, OnDestroy {
  quotesSubscription: Subscription;
  topics: Topic[];
  currentTopic: Topic;
  initialQuoteId;
  selectedQuoteId;
  selectedQuoteText;
  constructor(
    private quoteStoreService: QuoteStoreService,
    public dialogRef: MatDialogRef<AppQuotesBrowserComponent>
  ) { }

  ngOnInit() {
    this.selectedQuoteId = this.initialQuoteId;
    this.quoteStoreService.getAll();
    this.quotesSubscription = this.quoteStoreService.topicsWithQuotes$
      .subscribe(topicsList => {
        this.topics = topicsList;
        this.currentTopic = this.getCurrentTopic();
      });
  }

  ngOnDestroy() {
    this.quotesSubscription.unsubscribe();
  }

  safeClose() {
    if (this.selectedQuoteId !== this.initialQuoteId) {
      this.dialogRef.close({ selectedQuoteId: this.selectedQuoteId, selectedQuoteText: this.selectedQuoteText });
    } else {
      this.dialogRef.close();
    }
  }

  toggleSelectedQuote(quote) {
    if (this.selectedQuoteId === quote.id) {
      this.selectedQuoteId = '';
    } else {
      this.selectedQuoteId = quote.id;
      this.selectedQuoteText = quote.text;
    }
  }

  getCurrentTopic() {
    return this.topics.find(topic => !!(topic.quotes as Quote[]).find(quote => quote.id === this.selectedQuoteId))
      || (this.topics.length ? this.topics[0] : <Topic>{});
  }

  isSelectedQuote(quote) {
    return this.selectedQuoteId === quote.id;
  }
}
