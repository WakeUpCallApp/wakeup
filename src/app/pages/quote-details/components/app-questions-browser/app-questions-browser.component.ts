import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { QuestionStoreService } from '@app/common';
import isEqual from 'lodash/isEqual';

@Component({
  selector: 'app-questions-browser',
  templateUrl: './app-questions-browser.component.html',
  styleUrls: ['./app-questions-browser.component.scss']
})
export class AppQuestionsBrowserComponent implements OnInit, OnDestroy {
  allQuestionsSubscription: Subscription;
  questionSets;
  currentQuestionSet;
  selectedQuestions;
  initialSelection;
  constructor(
    private questionStoreService: QuestionStoreService,
    public dialogRef: MatDialogRef<AppQuestionsBrowserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initialSelection = this.data.selectedQuestions;
    this.selectedQuestions = this.data.selectedQuestions;
    this.questionStoreService.getAll();
    this.allQuestionsSubscription = this.questionStoreService.questions$
      .subscribe(questionSets => {
        this.questionSets = questionSets;
        if (questionSets) {
          this.currentQuestionSet = this.getCurrentQuestionSet();
        }
      });
  }

  ngOnDestroy() {
    this.allQuestionsSubscription.unsubscribe();
  }

  safeClose() {
    const noDifference = isEqual(
      this.selectedQuestions.map(q => q.id),
      this.initialSelection.map(q => q.id)
    );

    this.dialogRef.close(noDifference ? undefined : this.selectedQuestions);
  }

  toggleSelectedQuestion(question) {
    if (this.isSelectedQuestion(question)) {
      this.selectedQuestions = this.selectedQuestions.filter(
        q => q.id !== question.id
      );
    } else {
      this.selectedQuestions = [...this.selectedQuestions, question];
    }
  }

  isSelectedQuestion(question) {
    return this.selectedQuestions.find(q => q.id === question.id);
  }

  getCurrentQuestionSet() {
    const selectedIds = this.selectedQuestions.map(question => question.id);
    const questionSet = this.questionSets.find(
      qs =>
        qs.questions.find(q => selectedIds.indexOf(q.id) !== -1) !== undefined
    );
    return questionSet
      ? questionSet
      : this.questionSets.length ? this.questionSets[0] : {};
  }
}
