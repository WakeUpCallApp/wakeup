import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: "wakeup-add-question",
  templateUrl: "./wakeup-add-question.component.html",
  styleUrls: ["./wakeup-add-question.component.scss"]
})
export class WakeupAddQuestionComponent implements OnInit {
  @Input() question;
  @Output() create = new EventEmitter();
  @Output() openQuotesBrowser = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  handleClick() {
    this.create.emit(this.question);
  }

  openQuotes() {
    this.openQuotesBrowser.emit(this.question);
  }
}
