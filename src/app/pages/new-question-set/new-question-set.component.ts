import { Component, OnInit } from '@angular/core';
import { IQuestionSet, QuestionSet } from '../../common/models/question-set.model';
import { QuestionSetService } from '../../common/services/question-set.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as reducers from '../../common/reducers';
import * as actions from '../../common/actions/question-set.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'wakeup-new-question-set',
  templateUrl: './new-question-set.component.html',
  styleUrls: ['./new-question-set.component.scss']
})
export class NewQuestionSetComponent implements OnInit {
  questionSet: IQuestionSet = {
    name: '',
    description: ''
  };
  isCreating = false;
  constructor(private questionSetService: QuestionSetService,
    private router: Router,
    private store: Store<reducers.State>) { }

  ngOnInit() {
  }

  createQuestionSet() {
    this.isCreating = true;
    this.questionSetService.create(this.questionSet)
      .subscribe((result: QuestionSet) => {
        this.isCreating = false;
         this.store.dispatch(new actions.CreateAction(result));
         this.router.navigate([`/questionSetDetails`, result.id])
      },
      () => {
        this.isCreating = false;
      })
  }
}
