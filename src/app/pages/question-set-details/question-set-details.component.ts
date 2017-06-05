import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionSet } from '../../common/models/question-set.model';
import * as reducers from '../../common/reducers';
import * as actions from '../../common/actions/question-set.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'wakeup-question-set-details',
  templateUrl: './question-set-details.component.html',
  styleUrls: ['./question-set-details.component.scss']
})
export class QuestionSetDetailsComponent implements OnInit {
  questionSets$: Observable<QuestionSet[]>;
  currentQuestionSet: QuestionSet;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router) {
    this.currentQuestionSet = route.snapshot.data['currentQuestionSet'];
  }

  ngOnInit() {
  }

}
