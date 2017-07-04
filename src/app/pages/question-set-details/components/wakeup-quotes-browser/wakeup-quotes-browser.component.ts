import { Component, OnInit } from "@angular/core";
import { MdDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import * as reducers from "../../../../common/reducers";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as actions from "../../../../common/actions/quote.actions";
import { Topic } from "../../../../common/models/topic.model";
import { Quote } from "../../../../common/models/quote.model";

@Component({
  selector: "wakeup-quotes-browser",
  templateUrl: "./wakeup-quotes-browser.component.html",
  styleUrls: ["./wakeup-quotes-browser.component.scss"]
})
export class WakeupQuotesBrowserComponent implements OnInit {
  quotesSubscription: Subscription;
  topics: Topic[];
  currentTopic: Topic;
  selectedQuoteId;
  selectedQuoteText;
  constructor(
    private store: Store<reducers.State>,
    public dialogRef: MdDialogRef<WakeupQuotesBrowserComponent>
  ) {}

  ngOnInit() {
    this.store.dispatch(new actions.LoadAction());
    this.quotesSubscription = this.store
      .select(reducers.getTopicsWithQuotesState)
      .subscribe(topicsList => {
        this.topics = topicsList;
        this.currentTopic = this.getCurrentTopic();
      });
  }

  ngOnDestroy() {
    this.quotesSubscription.unsubscribe();
  }

  safeClose() {
    this.dialogRef.close({ selectedQuoteId: this.selectedQuoteId, selectedQuoteText: this.selectedQuoteText });
  }

  toggleSelectedQuote(quote) {
    if (this.selectedQuoteId === quote.id) {
      this.selectedQuoteId = "";
    } else {
      this.selectedQuoteId = quote.id;
      this.selectedQuoteText = quote.text;
    }
  }

  getCurrentTopic() {
    return this.topics.find(topic => !!topic.quotes.find(quote => quote.id === this.selectedQuoteId))
    || (this.topics.length ? this.topics[0] : <Topic>{});
  }

  isSelectedQuote(quote) {
    return this.selectedQuoteId === quote.id;
  }
}
