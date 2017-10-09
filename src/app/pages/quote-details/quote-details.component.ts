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
import { Title } from "@angular/platform-browser";

import * as reducers from "../../common/reducers";
import * as questionActions from "../../common/actions/question.actions";
import * as actions from "../../common/actions/quote.actions";
import * as topicActions from "../../common/actions/topic.actions";
import { Quote, ICreateComment } from "../../common/models/quote.model";
import { Topic } from "../../common/models/topic.model";
import { DialogService } from "../../common/services/dialog.service";

@Component({
  selector: "wakeup-quote-details",
  templateUrl: "./quote-details.component.html",
  styleUrls: ["./quote-details.component.scss"]
})
export class QuoteDetailsComponent implements OnInit {
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
  @ViewChild("textVar") textElRef: ElementRef;
  @ViewChild("authorVar") authorElRef: ElementRef;
  @ViewChild("sourceVar") sourceElRef: ElementRef;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private ngzone: NgZone,
    private cdref: ChangeDetectorRef,
    private titleService: Title,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(reducers.getLoadingQuoteState);
    this.actionsSubscription = Observable.combineLatest(
      this.route.params.filter(params => !!params["id"]),
      this.route.params.filter(params => !!params["topicId"]),
      (quoteIdParams, topicIdParams) => {
        this.store.dispatch(new topicActions.GetCurrentTopicAction(+topicIdParams['topicId']));
        this.store.dispatch(new actions.GetByIdAction(+quoteIdParams['id']));
        return new actions.GetCommentsAction(+quoteIdParams['id']);
      }
    ).subscribe(this.store);

    this.dataSubscription = Observable.combineLatest(
      this.store.select(reducers.getCurrentQuote),
      this.store.select(reducers.getCurrentTopicState),
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

    this.authors$ = this.store.select(reducers.getAuthorSuggestions);
    this.sources$ = this.store.select(reducers.getSourceSuggestions);
    this.comments$ = this.store.select(reducers.getComments);

    this.store.dispatch(new actions.GetSuggestionsAction());
  }

  ngAfterViewInit() {
    if (!this.textElRef && !this.authorElRef && !this.sourceElRef) {
      return;
    }
    this.ngzone.runOutsideAngular(() => {
      Observable.fromEvent(this.textElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          if (keyboardEvent.keyCode === 9) {
            return;
          }
          this.updateQuote();
          this.cdref.detectChanges();
        });
      Observable.fromEvent(this.authorElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          if (keyboardEvent.keyCode === 9) {
            return;
          }
          this.updateQuote();
          this.cdref.detectChanges();
        });
      Observable.fromEvent(this.sourceElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          if (keyboardEvent.keyCode === 9) {
            return;
          }
          this.updateQuote();
          this.cdref.detectChanges();
        });
    });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }

  updateQuote() {
    this.store.dispatch(new actions.UpdateAction(this.updateObject));
  }

  updateQuoteOnQuestionsUpdate(questions) {
    const updateObject = Object.assign({}, this.updateObject, {
      questions
    });
    this.store.dispatch(new actions.UpdateAction(updateObject));
  }

  onDeleteQuote() {
    this.dialogService.openDialog(
      "Are you sure you want to delete this quote",
      this.deleteQuote.bind(this)
    );
  }

  private deleteQuote() {
    this.store.dispatch(new actions.DeleteAction(this.updateObject));
  }

  addComment(commentObj) {
    commentObj.comment.createDate = new Date();
    this.store.dispatch(new actions.CreateCommentAction(commentObj));
    this.newComment = this.getEmptyComment();
  }

  onDeleteComment(comment) {
    this.dialogService.openDialog(
      "Are you sure you want to delete this commment?",
      () => this.deleteComment.call(this, comment)
    );
  }

  deleteComment(comment) {
    this.store.dispatch(
      new actions.DeleteCommentAction({
        quoteId: this.currentQuote.id,
        commentId: comment._id
      })
    );
  }

  getEmptyComment(): ICreateComment {
    const comment = {
      createDate: undefined,
      text: ""
    };
    return {
      comment,
      quoteId: this.currentQuote.id,
      isDefaultTopic: this.topic.isDefault
    };
  }
}
