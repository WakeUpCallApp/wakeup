import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: "wakeup-question",
  templateUrl: "./wakeup-question.component.html",
  styleUrls: ["./wakeup-question.component.scss"]
})
export class WakeupQuestionComponent implements OnInit {
  @Input() question;
  @Output() save = new EventEmitter();
  @Output() openQuotesBrowser = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  handleClick() {
    this.save.emit(this.question);
  }

  openQuotes() {
    this.openQuotesBrowser.emit(this.question);
  }
}
