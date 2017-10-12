import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-answers-list',
  templateUrl: './app-answers-list.component.html',
  styleUrls: ['./app-answers-list.component.scss']
})
export class AppAnswersListComponent implements OnInit, OnChanges {
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
