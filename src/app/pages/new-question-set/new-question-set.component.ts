import { Component, OnInit } from '@angular/core';
import { IQuestionSet } from '../../common/models/question-set.model';

import { Observable } from 'rxjs/Observable';
import { QuestionSetStoreService } from '../../common/store';

@Component({
  selector: 'wakeup-new-question-set',
  templateUrl: './new-question-set.component.html',
  styleUrls: ['./new-question-set.component.scss'],
  host: { 'class': 'newQuestionSet pageContent' }
})
export class NewQuestionSetComponent implements OnInit {
  questionSet: IQuestionSet = {
    name: '',
    description: '',
    isDefault: false
  };
  constructor(
    private questionSetStoreService: QuestionSetStoreService) { }

  ngOnInit() {
  }

  createQuestionSet() {
    this.questionSetStoreService.create(this.questionSet);
  }
}
