import { Component, OnInit } from '@angular/core';
import '@ngrx/core/add/operator/select';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionSet } from '../../common/models/question-set.model';
import * as reducers from '../../common/reducers';
import * as actions from '../../common/actions/question-set.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'wakeup-question-set-details',
  templateUrl: './question-set-details.component.html',
  styleUrls: ['./question-set-details.component.scss']
})
export class QuestionSetDetailsComponent implements OnInit {
  currentQuestionSet: QuestionSet;
  actionsSubscription: Subscription;
  qsSubscription: Subscription;
  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.actionsSubscription = this.route.params
      .select<string>('id')
      .map(id => new actions.GetCurrentQSAction(id))
      .subscribe(this.store);

    this.store.select(reducers.getCurrentQuestionSetState)
      .subscribe(currentQuestionSet => {
        this.currentQuestionSet = currentQuestionSet;
      });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.qsSubscription.unsubscribe();
  }

}
