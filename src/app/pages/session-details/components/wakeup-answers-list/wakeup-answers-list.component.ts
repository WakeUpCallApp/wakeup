import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "wakeup-answers-list",
  templateUrl: "./wakeup-answers-list.component.html",
  styleUrls: ["./wakeup-answers-list.component.scss"]
})
export class WakeupAnswersListComponent implements OnInit, OnChanges {
  @Input() answers;
  currentGroup;
  i = 0;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.answers) {
      this.currentGroup = changes.answers.currentValue.length
        ? this.answers[this.i]
        : undefined;
    }
  }

  getPrevSession(i) {
    if (!this.answers[i + 1]) {
      return;
    }
    this.currentGroup = this.answers[i + 1];
    this.i++;
  }

  getNextSession(i) {
    if (!this.answers[i - 1]) {
      return;
    }
    this.currentGroup = this.answers[i - 1];
    this.i--;
  }
}
