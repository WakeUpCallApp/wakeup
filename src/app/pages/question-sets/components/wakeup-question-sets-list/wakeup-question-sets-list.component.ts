import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import appConstants from '../../../../common/app-constants';

@Component({
  selector: 'wakeup-question-sets-list',
  templateUrl: './wakeup-question-sets-list.component.html',
  styleUrls: ['./wakeup-question-sets-list.component.scss']
})
export class WakeupQuestionSetsListComponent implements OnInit {
  @Input() questionSets;
  constructor(private router: Router) {}

  ngOnInit() {}

  startQuestionSet(e, questionSet) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (!questionSet.questionIds.length) {
      return;
    }
    this.router.navigate([
      appConstants.routes.PRACTICE_SESSION,
      questionSet.id
    ]);
  }
}
