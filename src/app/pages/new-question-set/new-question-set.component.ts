import { Component, OnInit } from '@angular/core';
import { IQuestionSet} from '../../common/models/question-set.model';
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
    description: '',
    isDefault: false
  };
   constructor(
    private store: Store<reducers.State>) { }

  ngOnInit() {
  }

  createQuestionSet() {
    this.store.dispatch(new actions.CreateAction(this.questionSet));
  }
}
