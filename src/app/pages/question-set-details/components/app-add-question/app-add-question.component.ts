import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AppQuotesBrowserComponent } from '../app-quotes-browser/app-quotes-browser.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './app-add-question.component.html',
  styleUrls: ['./app-add-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppAddQuestionComponent implements OnInit {
  @Input() question;
  @Output() create = new EventEmitter();
  selectedQuoteText;
  constructor(private dialog: MatDialog) { }

  ngOnInit() { }

  handleClick() {
    this.create.emit(this.question);
  }

  openQuotesBrowser(question) {
    const config: MatDialogConfig = {
      disableClose: false,
      width: '80%',
      height: '80%',
      data: { selectedQuoteId: undefined }
    };
    const dialogRef = this.dialog.open(AppQuotesBrowserComponent, config);
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
