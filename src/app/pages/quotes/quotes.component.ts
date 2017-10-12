import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { TopicStoreService, QuoteStoreService } from '../../common/store';
import { Quote, Topic } from '../../common/models';
import appConstants from '../../common/app-constants';
import { WakeupImportFileComponent } from '../../_shared/components/wakeup-import-file/wakeup-import-file.component';

@Component({
  selector: 'wakeup-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
  host: { 'class': 'quotes pageContent' }
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
    private topicStoreService: TopicStoreService,
    private quoteStoreService: QuoteStoreService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.isLoading$ = this.quoteStoreService.isLoading$;
    this.actionsSubscription = this.route.params
      .filter(params => !!params['topicId'])
      .map(idParams => {
        this.currentTopicId = idParams['topicId'];
        this.topicStoreService.get(this.currentTopicId);
        this.quoteStoreService.getByTopicId(+idParams['topicId']);
      })
      .subscribe();

    this.topicSubscription = this.topicStoreService.currentTopic$
      .subscribe(currentTopic => {
        this.currentTopic = Object.assign({}, currentTopic);
        this.titleService.setTitle(`Quotes: ${this.currentTopic.name}`);
      });

    this.importSpinnerSubscription = this.quoteStoreService.isImporting$
      .subscribe(importSpinner => {
        if (importSpinner) {
          this.importDialogRef.componentInstance.importSpinner = importSpinner;
        }
        if (importSpinner === false && this.importDialogRef) {
          this.importDialogRef.close();
        }
      });
    this.quotesSubscription = this.quoteStoreService.quotesByTopic$
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
    dialogRef.componentInstance.uploadFile = this.importQuotes.bind(this);
    dialogRef.afterClosed().subscribe(() => { });
  }

  importQuotes(files) {
    this.quoteStoreService.importQuotes(this.currentTopic.id, files);
  }

  exportQuotes() {
    const exportData = (this.quotes as any[]).map(quote => {
      return {
        author: quote.author,
        text: quote.text,
        source: quote.source
      };
    });
    this.quoteStoreService.exportQuotes(this.currentTopic.name, exportData);
  }
}
