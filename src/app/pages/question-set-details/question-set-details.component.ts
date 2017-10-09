import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  ApplicationRef,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Store } from "@ngrx/store";
import "@ngrx/core/add/operator/select";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { SessionOptions } from "../../common/services/session-config.service";
import { WakeupQuotesBrowserComponent } from "./components/wakeup-quotes-browser/wakeup-quotes-browser.component";
import { WakeupSessionConfigComponent } from "./components/wakeup-session-config/wakeup-session-config.component";
import { WakeupEditQuestionDialogComponent } from "./components/wakeup-edit-question-dialog/wakeup-edit-question-dialog.component";
import { WakeupImportFileComponent } from "../../common/components/wakeup-import-file/wakeup-import-file.component";
import { SessionConfigService } from "../../common/services/session-config.service";
import { DialogService } from "../../common/services/dialog.service";
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
export class QuestionSetDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  currentQuestionSet: QuestionSet;
  newQuestion: IQuestion;
  actionsSubscription: Subscription;
  qsSubscription: Subscription;
  updateObject;
  importSpinnerSubscription: Subscription;
  importDialogRef;
  isLoading$;
  @ViewChild("nameInput") nameElRef: ElementRef;
  @ViewChild("descriptionInput") descriptionElRef: ElementRef;
  constructor(
    private sessionConfigService: SessionConfigService,
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private ngzone: NgZone,
    private cdref: ChangeDetectorRef,
    private appref: ApplicationRef,
    private titleService: Title,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .select<string>("id")
      .map(id => new actions.GetCurrentQSAction(id))
      .subscribe(this.store);

    this.qsSubscription = this.store
      .select(reducers.getCurrentQuestionSetState)
      .subscribe(currentQuestionSet => {
        this.currentQuestionSet = <QuestionSet>Object.assign(
          {},
          currentQuestionSet
        );
        this.titleService.setTitle(`${this.currentQuestionSet.name} details`);
        this.updateObject = Object.assign({}, currentQuestionSet);
        this.newQuestion = this.getEmptyQuestion();
      });
    this.importSpinnerSubscription = this.store
      .select(reducers.getImportSpinner)
      .subscribe(importSpinner => {
        if (importSpinner) {
          this.importDialogRef.componentInstance.importSpinner = importSpinner;
        }
        if (importSpinner === false && this.importDialogRef) {
          this.importDialogRef.close();
        }
      });
    this.isLoading$ = this.store.select(reducers.getLoadingQuestionSetState);
  }

  ngAfterViewInit() {
    if (!this.nameElRef && !this.descriptionElRef) {
      return;
    }
    this.ngzone.runOutsideAngular(() => {
      Observable.fromEvent(this.nameElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          if (keyboardEvent.keyCode === 9) {
            return;
          }
          this.updateQuestionSet();
          this.cdref.detectChanges();
        });
      Observable.fromEvent(this.descriptionElRef.nativeElement, "keyup")
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          if (keyboardEvent.keyCode === 9) {
            return;
          }
          this.updateQuestionSet();
          this.cdref.detectChanges();
        });
    });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.qsSubscription.unsubscribe();
    this.importSpinnerSubscription.unsubscribe();
  }

  updateQuestionSet() {
    this.store.dispatch(new actions.UpdateAction(this.updateObject));
  }

  onQuestionSetDelete() {
    this.dialogService.openDialog(
      "Are you sure you want to delete this question set?",
      this.deleteQuestionSet.bind(this)
    );
  }

  private deleteQuestionSet() {
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

  onDeleteQuestions(questions) {
    this.dialogService.openDialog(
      "Are you sure you want to delete these questions?",
      () => this.deleteQuestions.call(this, questions)
    );
  }

  private deleteQuestions(questions) {
    questions.forEach(question =>
      this.store.dispatch(new actions.DeleteQuestionAction(question))
    );
  }

  editQuestion(question) {
    const config: MatDialogConfig = {
      disableClose: false,
      width: "600px"
    };
    const dialogRef = this.dialog.open(
      WakeupEditQuestionDialogComponent,
      config
    );
    dialogRef.componentInstance.question = Object.assign({}, question);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new actions.EditQuestionAction(result));
      }
    });
  }

  openQuotesBrowser(question) {
    const config: MatDialogConfig = {
      disableClose: false,
      width: "80%",
      height: "80%"
    };
    const dialogRef = this.dialog.open(WakeupQuotesBrowserComponent, config);
    dialogRef.componentInstance.initialQuoteId = question.quote;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        question.quote = result.selectedQuoteId;
        this.store.dispatch(new actions.EditQuestionAction(question));
      }
    });
  }

  openPracticeSessionModal() {
    const config: MatDialogConfig = {
      disableClose: false
    };
    const dialogRef = this.dialog.open(WakeupSessionConfigComponent, config);
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

  openImportQuestionsModal() {
    const config: MatDialogConfig = {
      disableClose: false
    };
    const dialogRef = this.dialog.open(WakeupImportFileComponent, config);
    this.importDialogRef = dialogRef;
    dialogRef.componentInstance.uploadFile = this.importQuestions.bind(this);
    dialogRef.afterClosed().subscribe(() => { });
  }

  importQuestions(files) {
    this.store.dispatch(
      new actions.ImportQuestionsAction({
        questionSetId: this.currentQuestionSet.id,
        questions: files
      })
    );
  }

  exportQuestions() {
    const exportData = (this.currentQuestionSet
      .questions as any[]).map(question => {
        return {
          questionName: question.text
        };
      });
    this.store.dispatch(
      new actions.ExportQuestionsAction({
        questions: exportData,
        questionSetName: this.currentQuestionSet.name
      })
    );
  }
}
