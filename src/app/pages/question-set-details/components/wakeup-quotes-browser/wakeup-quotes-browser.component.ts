import { Component, OnInit } from "@angular/core";
import { MdDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import * as reducers from "../../../../common/reducers";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as actions from "../../../../common/actions/quote.actions";
import { Quote } from "../../../../common/models/quote.model";

@Component({
  selector: "wakeup-quotes-browser",
  templateUrl: "./wakeup-quotes-browser.component.html",
  styleUrls: ["./wakeup-quotes-browser.component.scss"]
})
export class WakeupQuotesBrowserComponent implements OnInit {
  quotesSubscription: Subscription;
  quotes: Quote[];
  constructor(
    private store: Store<reducers.State>,
    public dialogRef: MdDialogRef<WakeupQuotesBrowserComponent>
  ) {}

  ngOnInit() {
    this.store.dispatch(new actions.LoadAction());
    this.quotesSubscription = this.store
      .select(reducers.getQuotesState)
      .subscribe(quotesList => {
        this.quotes = quotesList;
      });
  }

  ngOnDestroy() {
    this.quotesSubscription.unsubscribe();
  }

  safeClose() {
    this.dialogRef.close();
  }
}
