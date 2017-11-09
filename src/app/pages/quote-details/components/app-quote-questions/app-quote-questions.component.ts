import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AppQuestionsBrowserComponent } from '../app-questions-browser/app-questions-browser.component';

@Component({
  selector: 'app-quote-questions',
  templateUrl: './app-quote-questions.component.html',
  styleUrls: ['./app-quote-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppQuoteQuestionsComponent implements OnInit {
  @Input() questions;
  @Output() update = new EventEmitter();
  constructor(private dialog: MatDialog) { }

  ngOnInit() { }

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
      height: '80%',
      data: {
        selectedQuestions: this.questions
      }
    };
    const dialogRef = this.dialog.open(AppQuestionsBrowserComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update.emit(result);
      }
    });
  }
}
