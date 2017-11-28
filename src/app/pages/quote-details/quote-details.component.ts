import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  NgZone,
  ChangeDetectorRef,
  HostBinding,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, tap, takeUntil, skip, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Title } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import {
  QuoteStoreService,
  TopicStoreService,
  Quote,
  ICreateComment,
  Topic,
  DialogService,
  LoginApi,
} from '@app/common';
import appConstants from '@app/common/app-constants';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.scss'],
})
export class QuoteDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') classes = `${appConstants.ui.PAGE_CONTAINER_CLASS}`;

  currentQuote: Quote;
  updateObject;
  authors$: Observable<string[]>;
  sources$: Observable<string[]>;
  comments$: Observable<Comment[]>;
  isLoading$;
  topic: Topic;
  newComment: ICreateComment;
  quoteForm;

  private componentDestroyed = new Subject();
  private initFormFlag = false;

  constructor(
    private quoteStoreService: QuoteStoreService,
    private topicStoreService: TopicStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private ngzone: NgZone,
    private cdref: ChangeDetectorRef,
    private titleService: Title,
    private dialogService: DialogService,
    private loginApi: LoginApi,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isLoading$ = this.quoteStoreService.isLoading$;
    this.authors$ = this.quoteStoreService.authorSuggestions$;
    this.sources$ = this.quoteStoreService.sourceSuggestions$;
    this.comments$ = this.quoteStoreService.comments$;

    this.quoteStoreService.getSuggestions();
    this.quoteForm = this.fb.group({
      text: '',
      author: '',
      source: '',
    });

    this.route.params
      .pipe(
        map(params => params),
        tap(params => {
          this.topicStoreService.get(params.topicId);
          this.quoteStoreService.getById(params.id);
          this.quoteStoreService.getComments(params.id);
        }),
        takeUntil(this.componentDestroyed)
      )
      .subscribe();

    Observable.combineLatest(
      this.quoteStoreService.currentQuote$,
      this.topicStoreService.currentTopic$,
      (quote, topic) => {
        this.currentQuote = quote;
        this.updateObject = { ...this.currentQuote };
        if (quote.text) {
          this.titleService.setTitle(
            `Quote Details: ${quote.text.substring(0, 60)}...`
          );
          if (!this.initFormFlag) {
            this.initForm(quote);
          }
        }
        if (topic) {
          this.topic = topic;
          this.newComment = this.getEmptyComment();
        }
      }
    )
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe();
  }

  ngAfterViewInit() {
    this.ngzone.runOutsideAngular(() => {
      [
        this.quoteForm.get('text'),
        this.quoteForm.get('author'),
        this.quoteForm.get('source'),
      ].forEach(field => {
        field.valueChanges
          .pipe(skip(1), debounceTime(1000), takeUntil(this.componentDestroyed))
          .subscribe(val => {
            this.updateQuote({ ...this.updateObject, ...this.quoteForm.value });
            this.cdref.detectChanges();
          });
      });
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  initForm(quote) {
    this.quoteForm.setValue({
      text: quote.text,
      author: quote.author,
      source: quote.source,
    });
    this.initFormFlag = true;
  }

  updateQuote(quote) {
    this.quoteStoreService.update(quote);
  }

  updateQuoteOnQuestionsUpdate(questions) {
    const updateObject = {
      ...this.updateObject,
      questions,
    };
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
      text: '',
      user: this.loginApi.getCurrentUser()._id,
    };
    return {
      comment,
      quoteId: this.currentQuote.id,
      isDefaultTopic: this.topic.isDefault,
    };
  }
}
