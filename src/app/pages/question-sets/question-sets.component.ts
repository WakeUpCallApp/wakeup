import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionSet } from '../../common/models/question-set.model';
import * as reducers from '../../common/reducers';
import * as actions from '../../common/actions/question-set.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'wakeup-question-sets',
  templateUrl: './question-sets.component.html',
  styleUrls: ['./question-sets.component.scss']
})
export class QuestionSetsComponent implements OnInit {
  questionSets$: Observable<QuestionSet[]>;

  constructor(private store: Store<reducers.State>) {
    this.questionSets$ = store.select(reducers.getQuestionSetsState);
   }

  ngOnInit() {
     this.store.dispatch(new actions.LoadAction());
  }

}
