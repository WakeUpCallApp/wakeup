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
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  WakeupQuotesBrowserComponent,
  WakeupSessionConfigComponent,
  WakeupEditQuestionDialogComponent
} from './components';
import { WakeupImportFileComponent } from '../../_shared/components/wakeup-import-file/wakeup-import-file.component';
import { DialogService, SessionConfigService } from '../../common/services';
import { SessionOptions } from '../../common/services/session-config.service';
import { QuestionSet, IQuestion } from '../../common/models';
import { QuestionSetStoreService } from '../../common/store';

import appConstants from '../../common/app-constants';

@Component({
  selector: 'wakeup-question-set-details',
  templateUrl: './question-set-details.component.html',
  styleUrls: ['./question-set-details.component.scss'],
  host: { 'class': 'pageContent' }
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
  @ViewChild('nameInput') nameElRef: ElementRef;
  @ViewChild('descriptionInput') descriptionElRef: ElementRef;
  constructor(
    private sessionConfigService: SessionConfigService,
    private questionSetStoreService: QuestionSetStoreService,
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
      .filter(params => !!params['id'])
      .map(idParams => this.questionSetStoreService.get(idParams['id']))
      .subscribe();

    this.qsSubscription = this.questionSetStoreService.currentQuestionSet$
      .subscribe(currentQuestionSet => {
        this.currentQuestionSet = <QuestionSet>currentQuestionSet;
        this.titleService.setTitle(`${this.currentQuestionSet.name} details`);
        this.updateObject = Object.assign({}, currentQuestionSet);
        this.newQuestion = this.getEmptyQuestion();
      });

    this.importSpinnerSubscription = this.questionSetStoreService.isImporting$
      .subscribe(importSpinner => {
        if (importSpinner) {
          this.importDialogRef.componentInstance.importSpinner = importSpinner;
        }
        if (importSpinner === false && this.importDialogRef) {
          this.importDialogRef.close();
        }
      });
    this.isLoading$ = this.questionSetStoreService.isLoading$;
  }

  ngAfterViewInit() {
    if (!this.nameElRef && !this.descriptionElRef) {
      return;
    }
    this.ngzone.runOutsideAngular(() => {
      Observable.fromEvent(this.nameElRef.nativeElement, 'keyup')
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          if (keyboardEvent.keyCode === 9) {
            return;
          }
          this.updateQuestionSet();
          this.cdref.detectChanges();
        });
      Observable.fromEvent(this.descriptionElRef.nativeElement, 'keyup')
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
    this.questionSetStoreService.update(this.updateObject);
  }

  onQuestionSetDelete() {
    this.dialogService.openDialog(
      'Are you sure you want to delete this question set?',
      this.deleteQuestionSet.bind(this)
    );
  }

  private deleteQuestionSet() {
    this.questionSetStoreService.delete(this.currentQuestionSet);
  }

  getEmptyQuestion() {
    return {
      id: undefined,
      text: '',
      quote: undefined,
      questionSet: this.currentQuestionSet.id
    };
  }

  addQuestion(qs: IQuestion) {
    this.questionSetStoreService.addQuestion(qs);
    this.newQuestion = this.getEmptyQuestion();
  }

  onDeleteQuestions(questions) {
    this.dialogService.openDialog(
      'Are you sure you want to delete these questions?',
      () => this.deleteQuestions.call(this, questions)
    );
  }

  private deleteQuestions(questions) {
    questions.forEach(question =>
      this.questionSetStoreService.deleteQuestion(question)
    );
  }

  editQuestion(question) {
    const config: MatDialogConfig = {
      disableClose: false,
      width: '600px'
    };
    const dialogRef = this.dialog.open(
      WakeupEditQuestionDialogComponent,
      config
    );
    dialogRef.componentInstance.question = Object.assign({}, question);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.questionSetStoreService.editQuestion(result);
      }
    });
  }

  openQuotesBrowser(question) {
    const config: MatDialogConfig = {
      disableClose: false,
      width: '80%',
      height: '80%'
    };
    const dialogRef = this.dialog.open(WakeupQuotesBrowserComponent, config);
    dialogRef.componentInstance.initialQuoteId = question.quote;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        question.quote = result.selectedQuoteId;
        this.questionSetStoreService.editQuestion(question);
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
    this.questionSetStoreService.importQuestions(this.currentQuestionSet.id, files);
  }

  exportQuestions() {
    const exportData = (this.currentQuestionSet
      .questions as any[]).map(question => {
        return {
          questionName: question.text
        };
      });
    this.questionSetStoreService.exportQuestions(exportData, this.currentQuestionSet.name);
  }
}
