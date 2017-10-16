import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { TopicStoreService, QuoteStoreService } from '../../common/store';
import { Quote, Topic } from '../../common/models';
import appConstants from '../../common/app-constants';
import { AppImportFileComponent } from '../../_shared/components/app-import-file/app-import-file.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = `quotes ${appConstants.ui.PAGE_CONTAINER_CLASS}`;
  quotesMenu;
  currentTopicId;
  currentTopic: Topic;
  importDialogRef;
  isLoading$;
  quotes;
  private componentDestroyed = new Subject();
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
    
    this.route.params
      .filter(params => !!params['topicId'])
      .map(idParams => {
        this.currentTopicId = idParams['topicId'];
        this.topicStoreService.get(this.currentTopicId);
        this.quoteStoreService.getByTopicId(+idParams['topicId']);
      })
      .takeUntil(this.componentDestroyed).subscribe();

    this.topicStoreService.currentTopic$
      .takeUntil(this.componentDestroyed)
      .subscribe(currentTopic => {
        this.currentTopic = Object.assign({}, currentTopic);
        this.titleService.setTitle(`Quotes: ${this.currentTopic.name}`);
      });

    this.quoteStoreService.isImporting$
      .takeUntil(this.componentDestroyed)
      .subscribe(importSpinner => {
        if (importSpinner) {
          this.importDialogRef.componentInstance.importSpinner = importSpinner;
        }
        if (importSpinner === false && this.importDialogRef) {
          this.importDialogRef.close();
        }
      });
    this.quoteStoreService.quotesByTopic$
      .takeUntil(this.componentDestroyed)
      .subscribe(quotes => (this.quotes = quotes));
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  goToCreateQuote() {
    this.router.navigate([appConstants.routes.NEW_QUOTE, this.currentTopicId]);
  }

  openImportQuotesModal() {
    const config: MatDialogConfig = {
      disableClose: false
    };
    const dialogRef = this.dialog.open(AppImportFileComponent, config);
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
