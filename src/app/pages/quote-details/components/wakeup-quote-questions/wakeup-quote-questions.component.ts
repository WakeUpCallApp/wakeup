import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { WakeupQuestionsBrowserComponent} from '../wakeup-questions-browser/wakeup-questions-browser.component';

@Component({
  selector: 'wakeup-quote-questions',
  templateUrl: './wakeup-quote-questions.component.html',
  styleUrls: ['./wakeup-quote-questions.component.scss']
})
export class WakeupQuoteQuestionsComponent implements OnInit {
  @Input() questions;
  @Output() update = new EventEmitter();
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  onRemove(questionToRemove) {
    const questions = this.questions.filter(
      question => question.id !== questionToRemove.id
    );
    this.update.emit(questions);
  }

  openQuestionsBrowser() {
    const config: MatDialogConfig = {
      disableClose: false,
      width: '80%',
      height: '80%'
    };
    const dialogRef = this.dialog.open(WakeupQuestionsBrowserComponent, config);
     dialogRef.componentInstance.selectedQuestions = this.questions;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update.emit(result);
      }
    });
  }
}
