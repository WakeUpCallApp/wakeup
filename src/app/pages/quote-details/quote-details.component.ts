import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone,
  ChangeDetectorRef,
  HostBinding
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

import { QuoteStoreService, TopicStoreService } from '../../common/store';
import { Quote, ICreateComment, Topic } from '../../common/models';
import { DialogService } from '../../common/services/dialog.service';
import appConstants from '../../common/app-constants';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.scss']
})
export class QuoteDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') classes = `${appConstants.ui.PAGE_CONTAINER_CLASS}`;
  actionsSubscription: Subscription;
  dataSubscription: Subscription;
  currentQuote: Quote;
  updateObject;
  authors$: Observable<string[]>;
  sources$: Observable<string[]>;
  comments$: Observable<Comment[]>;
  topic: Topic;
  newComment: ICreateComment;
  isLoading$;
  @ViewChild('textVar') textElRef: ElementRef;
  @ViewChild('authorVar') authorElRef: ElementRef;
  @ViewChild('sourceVar') sourceElRef: ElementRef;
  constructor(
    private quoteStoreService: QuoteStoreService,
    private topicStoreService: TopicStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private ngzone: NgZone,
    private cdref: ChangeDetectorRef,
    private titleService: Title,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.isLoading$ = this.quoteStoreService.isLoading$;
    this.actionsSubscription = Observable.combineLatest(
      this.route.params.filter(params => !!params['id']),
      this.route.params.filter(params => !!params['topicId']),
      (quoteIdParams, topicIdParams) => {
        this.topicStoreService.get(+topicIdParams['topicId']);
        this.quoteStoreService.getById(+quoteIdParams['id']);
        this.quoteStoreService.getComments(+quoteIdParams['id']);
      }
    ).subscribe();

    this.dataSubscription = Observable.combineLatest(
      this.quoteStoreService.currentQuote$,
      this.topicStoreService.currentTopic$,
      (quote, topic) => {
        this.currentQuote = quote;
        this.updateObject = Object.assign({}, this.currentQuote);
        if (quote.text) {
          this.titleService.setTitle(
            `Quote Details: ${quote.text.substring(0, 60)}...`
          );
        }
        if (topic) {
          this.topic = topic;
          this.newComment = this.getEmptyComment();
        }
      }
    ).subscribe();

    this.authors$ = this.quoteStoreService.authorSuggestions$;
    this.sources$ = this.quoteStoreService.sourceSuggestions$;
    this.comments$ = this.quoteStoreService.comments$;

    this.quoteStoreService.getSuggestions();
  }

  ngAfterViewInit() {
    if (!this.textElRef && !this.authorElRef && !this.sourceElRef) {
      return;
    }
    this.ngzone.runOutsideAngular(() => {
      Observable.fromEvent(this.textElRef.nativeElement, 'keyup')
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          if (keyboardEvent.keyCode === 9) {
            return;
          }
          this.updateQuote(this.updateObject);
          this.cdref.detectChanges();
        });
      Observable.fromEvent(this.authorElRef.nativeElement, 'keyup')
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          if (keyboardEvent.keyCode === 9) {
            return;
          }
          this.updateQuote(this.updateObject);
          this.cdref.detectChanges();
        });
      Observable.fromEvent(this.sourceElRef.nativeElement, 'keyup')
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          if (keyboardEvent.keyCode === 9) {
            return;
          }
          this.updateQuote(this.updateObject);
          this.cdref.detectChanges();
        });
    });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }

  updateQuote(quote) {
    this.quoteStoreService.update(quote);
  }

  updateQuoteOnQuestionsUpdate(questions) {
    const updateObject = Object.assign({}, this.updateObject, {
      questions
    });
    this.updateQuote(updateObject);
  }

  onDeleteQuote() {
    this.dialogService.openDialog(
      'Are you sure you want to delete this quote',
      this.deleteQuote.bind(this)
    );
  }

  private deleteQuote() {
    this.quoteStoreService.delete(this.updateObject);
  }

  addComment(commentObj) {
    this.quoteStoreService.createComment(commentObj);
    this.newComment = this.getEmptyComment();
  }

  onDeleteComment(comment) {
    this.dialogService.openDialog(
      'Are you sure you want to delete this commment?',
      () => this.deleteComment.call(this, comment)
    );
  }

  deleteComment(comment) {
    this.quoteStoreService.deleteComment(this.currentQuote.id, comment._id);
  }

  getEmptyComment(): ICreateComment {
    const comment = {
      createDate: undefined,
      text: ''
    };
    return {
      comment,
      quoteId: this.currentQuote.id,
      isDefaultTopic: this.topic.isDefault
    };
  }
}
