import { Component, OnInit} from '@angular/core';
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
  newQuestion: string;
  actionsSubscription: Subscription;
  qsSubscription: Subscription;
  updateObject;
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

    this.qsSubscription = this.store.select(reducers.getCurrentQuestionSetState)
      .subscribe(currentQuestionSet => {
        this.currentQuestionSet = Object.assign({}, currentQuestionSet);
        this.updateObject = Object.assign({}, currentQuestionSet);
      });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.qsSubscription.unsubscribe();
  }

  addQuestion() {
    this.store.dispatch(new actions.AddQuestionAction(
      {
        text: this.newQuestion,
        questionSet: this.currentQuestionSet.id,
        date: new Date().getTime()
      }));
      this.newQuestion = '';
  }

  updateQuestionSet($event) {
     this.store.dispatch(new actions.UpdateAction(this.updateObject)); 
  }

  deleteQuestionSet() {
    this.store.dispatch(new actions.DeleteAction(this.currentQuestionSet.id));
  }

}
