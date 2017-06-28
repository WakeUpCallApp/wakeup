import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import * as reducers from "../../common/reducers";
import * as actions from "../../common/actions/quote.actions";
import { Quote } from "../../common/models/quote.model";
import appConstants from "../../common/app-constants";

@Component({
  selector: "wakeup-quotes",
  templateUrl: "./quotes.component.html",
  styleUrls: ["./quotes.component.scss"]
})
export class QuotesComponent implements OnInit {
  quotes$: Observable<Quote[]>;
  actionsSubscription: Subscription;
  currentTopicId;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .select<string>("id")
      .map(id => {
        this.currentTopicId = id;
        return new actions.GetByTopicIdAction(+id);
      })
      .subscribe(this.store);

    this.quotes$ = this.store.select(reducers.getQuotesByTopic);
  }

  goToCreateQuote() {
    this.router.navigate([appConstants.routes.NEW_QUOTE, this.currentTopicId]);
  }
}
