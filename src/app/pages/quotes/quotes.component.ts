import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { MatDialog, MatDialogConfig } from "@angular/material";

import * as reducers from "../../common/reducers";
import * as actions from "../../common/actions/quote.actions";
import * as topicActions from "../../common/actions/topic.actions";
import { Quote } from "../../common/models/quote.model";
import { Topic } from "../../common/models/topic.model";
import appConstants from "../../common/app-constants";
import { WakeupImportFileComponent } from "../../common/components/wakeup-import-file/wakeup-import-file.component";

@Component({
  selector: "wakeup-quotes",
  templateUrl: "./quotes.component.html",
  styleUrls: ["./quotes.component.scss"]
})
export class QuotesComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  topicSubscription: Subscription;
  currentTopicId;
  currentTopic: Topic;
  importSpinnerSubscription: Subscription;
  importDialogRef;
  isLoading$;
  quotesSubscription;
  quotes;
  constructor(
    private store: Store<reducers.State>,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(reducers.getLoadingQuoteState);
    this.actionsSubscription = this.route.params
      .select<string>("topicId")
      .map(id => {
        this.currentTopicId = id;
        this.store.dispatch(
          new topicActions.GetCurrentTopicAction(this.currentTopicId)
        );
        return new actions.GetByTopicIdAction(+id);
      })
      .subscribe(this.store);

    this.topicSubscription = this.store
      .select(reducers.getCurrentTopicState)
      .subscribe(currentTopic => {
        this.currentTopic = Object.assign({}, currentTopic);
        this.titleService.setTitle(`Quotes: ${this.currentTopic.name}`);
      });

    this.importSpinnerSubscription = this.store
      .select(reducers.getQuotesImportSpinner)
      .subscribe(importSpinner => {
        if (importSpinner) {
          this.importDialogRef.componentInstance.importSpinner = importSpinner;
        }
        if (importSpinner === false && this.importDialogRef) {
          this.importDialogRef.close();
        }
      });
    this.quotesSubscription = this.store
      .select(reducers.getQuotesByTopic)
      .subscribe(quotes => (this.quotes = quotes));
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.topicSubscription.unsubscribe();
    this.importSpinnerSubscription.unsubscribe();
    this.quotesSubscription.unsubscribe();
  }

  goToCreateQuote() {
    this.router.navigate([appConstants.routes.NEW_QUOTE, this.currentTopicId]);
  }

  openImportQuotesModal() {
    const config: MatDialogConfig = {
      disableClose: false
    };
    const dialogRef = this.dialog.open(WakeupImportFileComponent, config);
    this.importDialogRef = dialogRef;
    dialogRef.componentInstance.uploadFile = this.importQuestions.bind(this);
    dialogRef.afterClosed().subscribe(() => {});
  }

  importQuestions(files) {
    this.store.dispatch(
      new actions.ImportQuotesAction({
        topicId: this.currentTopic.id,
        quotes: files
      })
    );
  }

  exportQuotes() {
    const exportData = (this.quotes as any[]).map(quote => {
      return {
        author: quote.author,
        text: quote.text,
        source: quote.source
      };
    });
    this.store.dispatch(
      new actions.ExportQuotesAction({
        quotes: exportData,
        topicName: this.currentTopic.name
      })
    );
  }
}
