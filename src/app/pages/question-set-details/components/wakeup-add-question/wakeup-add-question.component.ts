import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { WakeupQuotesBrowserComponent } from '../wakeup-quotes-browser/wakeup-quotes-browser.component';

@Component({
  selector: 'wakeup-add-question',
  templateUrl: './wakeup-add-question.component.html',
  styleUrls: ['./wakeup-add-question.component.scss']
})
export class WakeupAddQuestionComponent implements OnInit {
  @Input() question;
  @Output() create = new EventEmitter();
  selectedQuoteText;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  handleClick() {
    this.create.emit(this.question);
  }

  openQuotesBrowser(question) {
    const config: MatDialogConfig = {
      disableClose: false,
      width: '80%',
      height: '80%'
    };
    const dialogRef = this.dialog.open(WakeupQuotesBrowserComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        question.quote = result.selectedQuoteId;
        this.selectedQuoteText = result.selectedQuoteText;
      }
    });
  }

  removeQuote() {
    this.question.quote = undefined;
  }
}
