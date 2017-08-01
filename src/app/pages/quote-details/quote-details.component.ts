import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
  ChangeDetectorRef
} from "@angular/core";

import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import * as reducers from "../../common/reducers";
import * as questionActions from "../../common/actions/question.actions";
import * as actions from "../../common/actions/quote.actions";
import { Quote } from "../../common/models/quote.model";

@Component({
  selector: "wakeup-quote-details",
  templateUrl: "./quote-details.component.html",
  styleUrls: ["./quote-details.component.scss"]
})
export class QuoteDetailsComponent implements OnInit {
  actionsSubscription: Subscription;
  quoteSubscription: Subscription;
  currentQuote: Quote;
  updateObject;
  authors$: Observable<string[]>;
  sources$: Observable<string[]>;
  @ViewChild("textVar") textElRef: ElementRef;
  @ViewChild("authorVar") authorElRef: ElementRef;
  @ViewChild("sourceVar") sourceElRef: ElementRef;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private ngzone: NgZone,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .select<string>("id")
      .subscribe(quoteId => {
        this.store.dispatch(new actions.GetByIdAction(+quoteId));
      });
    this.quoteSubscription = this.store
      .select(reducers.getCurrentQuote)
      .subscribe(quote => {
        this.currentQuote = quote;
        this.updateObject = Object.assign({}, this.currentQuote);
      });
    this.authors$ = this.store.select(reducers.getAuthorSuggestions);
    this.sources$ = this.store.select(reducers.getSourceSuggestions);

    this.store.dispatch(new actions.GetSuggestionsAction());
  }

  ngAfterViewInit() {
    if (!this.textElRef && !this.authorElRef && !this.sourceElRef) {
      return;
    }
    this.ngzone.runOutsideAngular(() => {
      Observable.fromEvent(this.textElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe(keyboardEvent => {
          this.updateQuote();
          this.cdref.detectChanges();
        });
      Observable.fromEvent(this.authorElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe(keyboardEvent => {
          this.updateQuote();
          this.cdref.detectChanges();
        });
      Observable.fromEvent(this.sourceElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe(keyboardEvent => {
          this.updateQuote();
          this.cdref.detectChanges();
        });
    });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  updateQuote() {
   this.store.dispatch(new actions.UpdateAction(this.updateObject)); 
  }
}
