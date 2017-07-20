import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  ApplicationRef,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MdDialog, MdDialogConfig } from "@angular/material";
import { Store } from "@ngrx/store";
import "@ngrx/core/add/operator/select";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { SessionOptions } from "../../common/services/session-config.service";
import { WakeupQuotesBrowserComponent } from "./components/wakeup-quotes-browser/wakeup-quotes-browser.component";
import { WakeupSessionConfigComponent } from "./components/wakeup-session-config/wakeup-session-config.component";
import { WakeupEditQuestionDialogComponent } from "./components/wakeup-edit-question-dialog/wakeup-edit-question-dialog.component";
import { SessionConfigService } from "../../common/services/session-config.service";
import { QuestionSet } from "../../common/models/question-set.model";
import { IQuestion } from "../../common/models/question.model";
import * as reducers from "../../common/reducers";
import * as actions from "../../common/actions/question-set.actions";
import appConstants from "../../common/app-constants";

@Component({
  selector: "wakeup-question-set-details",
  templateUrl: "./question-set-details.component.html",
  styleUrls: ["./question-set-details.component.scss"]
})
export class QuestionSetDetailsComponent implements OnInit {
  currentQuestionSet: QuestionSet;
  newQuestion: IQuestion;
  actionsSubscription: Subscription;
  qsSubscription: Subscription;
  updateObject;
  @ViewChild("nameInput") nameElRef: ElementRef;
  @ViewChild("descriptionInput") descriptionElRef: ElementRef;
  constructor(
    private sessionConfigService: SessionConfigService,
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MdDialog,
    private ngzone: NgZone,
    private cdref: ChangeDetectorRef,
    private appref: ApplicationRef
  ) { }

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .select<string>("id")
      .map(id => new actions.GetCurrentQSAction(id))
      .subscribe(this.store);

    this.qsSubscription = this.store
      .select(reducers.getCurrentQuestionSetState)
      .subscribe(currentQuestionSet => {
        this.currentQuestionSet = Object.assign({}, currentQuestionSet);
        this.updateObject = Object.assign({}, currentQuestionSet);
        this.newQuestion = this.getEmptyQuestion();
      });
  }

  ngAfterViewInit() {
    if (!this.nameElRef && !this.descriptionElRef) {
      return;
    }
    this.ngzone.runOutsideAngular(() => {
      Observable.fromEvent(this.nameElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe(keyboardEvent => {
          this.updateQuestionSet();
          this.cdref.detectChanges();
        });
      Observable.fromEvent(this.descriptionElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe(keyboardEvent => {
          this.updateQuestionSet();
          this.cdref.detectChanges();
        });
    });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.qsSubscription.unsubscribe();
  }

  updateQuestionSet() {
    this.store.dispatch(new actions.UpdateAction(this.updateObject));
  }

  deleteQuestionSet() {
    this.store.dispatch(new actions.DeleteAction(this.currentQuestionSet.id));
  }

  getEmptyQuestion() {
    return {
      id: undefined,
      text: "",
      quote: undefined,
      questionSet: this.currentQuestionSet.id
    };
  }

  addQuestion(qs: IQuestion) {
    this.store.dispatch(
      new actions.AddQuestionAction({
        text: qs.text,
        questionSet: qs.questionSet,
        date: new Date().getTime(),
        quote: qs.quote
      })
    );
    this.newQuestion = this.getEmptyQuestion();
  }

  deleteQuestions(questions) {
    questions.forEach(question =>
      this.store.dispatch(new actions.DeleteQuestionAction(question.id))
    );
  }

  editQuestion(question) {
    let config: MdDialogConfig = {
      disableClose: false,
      width: "600px"
    };
    let dialogRef = this.dialog.open(WakeupEditQuestionDialogComponent, config);
    dialogRef.componentInstance.question = Object.assign({}, question);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new actions.EditQuestionAction(result));
      }
    });
  }

  openQuotesBrowser(question) {
    let config: MdDialogConfig = {
      disableClose: false,
      width: "80%",
      height: "80%"
    };
    let dialogRef = this.dialog.open(WakeupQuotesBrowserComponent, config);
    dialogRef.componentInstance.selectedQuoteId = question.quoteId;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        question.quoteId = result.selectedQuoteId;
        this.store.dispatch(new actions.EditQuestionAction(question));
      }
    });
  }

  openPracticeSessionModel() {
    let config: MdDialogConfig = {
      disableClose: false,
    };
    let dialogRef = this.dialog.open(WakeupSessionConfigComponent, config);
    dialogRef.afterClosed().subscribe((options: SessionOptions) => {
      if (options) {
        this.sessionConfigService.setOptions(options);
        this.router.navigate([
          appConstants.routes.PRACTICE_SESSION,
          this.currentQuestionSet.id
        ]);
      }
    });
  }
}
