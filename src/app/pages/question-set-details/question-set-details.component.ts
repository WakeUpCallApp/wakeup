import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  ApplicationRef,
  ViewChild,
  ElementRef,
  HostBinding
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  AppQuotesBrowserComponent,
  AppSessionConfigComponent,
  AppEditQuestionDialogComponent
} from './components';
import { AppImportFileComponent } from '@app/_shared/components';
import {
  DialogService,
  SessionConfigService,
  SessionOptions,
  QuestionSet,
  IQuestion,
  QuestionSetStoreService
} from '@app/common';
import appConstants from '@app/common/app-constants';

@Component({
  selector: 'app-question-set-details',
  templateUrl: './question-set-details.component.html',
  styleUrls: ['./question-set-details.component.scss']
})
export class QuestionSetDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') classes = `${appConstants.ui.PAGE_CONTAINER_CLASS}`;
  currentQuestionSet: QuestionSet;
  newQuestion: IQuestion;
  updateObject;
  importDialogRef;
  isLoading$;
  appMenu;
  @ViewChild('nameInput') nameElRef: ElementRef;
  @ViewChild('descriptionInput') descriptionElRef: ElementRef;
  private componentDestroyed = new Subject();
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
    this.isLoading$ = this.questionSetStoreService.isLoading$;
    this.route.params
      .filter(params => !!params['id'])
      .map(idParams => this.questionSetStoreService.get(idParams['id']))
      .takeUntil(this.componentDestroyed).subscribe();

    this.questionSetStoreService.currentQuestionSet$
      .takeUntil(this.componentDestroyed)
      .subscribe(currentQuestionSet => {
        this.currentQuestionSet = <QuestionSet>currentQuestionSet;
        this.titleService.setTitle(`${this.currentQuestionSet.name} details`);
        this.updateObject = Object.assign({}, currentQuestionSet);
        this.newQuestion = this.getEmptyQuestion();
      });

    this.questionSetStoreService.isImporting$
      .takeUntil(this.componentDestroyed)
      .subscribe(importSpinner => {
        if (importSpinner) {
          this.importDialogRef.componentInstance.importSpinner = importSpinner;
        }
        if (importSpinner === false && this.importDialogRef) {
          this.importDialogRef.close();
        }
      });

  }

  ngAfterViewInit() {
    if (!this.nameElRef && !this.descriptionElRef) {
      return;
    }
    this.ngzone.runOutsideAngular(() => {
      [this.nameElRef, this.descriptionElRef].forEach(field => {
        Observable.fromEvent(field.nativeElement, 'keyup')
          .debounceTime(1000)
          .takeUntil(this.componentDestroyed)
          .subscribe((keyboardEvent: any) => {
            if (keyboardEvent.keyCode === appConstants.keyCodes.TAB) {
              return;
            }
            this.updateQuestionSet();
            this.cdref.detectChanges();
          });
      });
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
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
      AppEditQuestionDialogComponent,
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
    const dialogRef = this.dialog.open(AppQuotesBrowserComponent, config);
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
    const dialogRef = this.dialog.open(AppSessionConfigComponent, config);
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
    const dialogRef = this.dialog.open(AppImportFileComponent, config);
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
