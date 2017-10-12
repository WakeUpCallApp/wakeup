import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import appConstants from '../../../../common/app-constants';

@Component({
  selector: 'app-question-sets-list',
  templateUrl: './app-question-sets-list.component.html',
  styleUrls: ['./app-question-sets-list.component.scss']
})
export class AppQuestionSetsListComponent implements OnInit {
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
