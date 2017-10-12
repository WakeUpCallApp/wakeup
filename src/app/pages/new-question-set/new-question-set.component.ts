import { Component, OnInit, HostBinding } from '@angular/core';
import { IQuestionSet } from '../../common/models/question-set.model';

import { Observable } from 'rxjs/Observable';
import { QuestionSetStoreService } from '../../common/store';
import appConstants from '../../common/app-constants';

@Component({
  selector: 'app-new-question-set',
  templateUrl: './new-question-set.component.html',
  styleUrls: ['./new-question-set.component.scss']
})
export class NewQuestionSetComponent implements OnInit {
  @HostBinding('class') classes = `newQuestionSet ${appConstants.ui.PAGE_CONTAINER_CLASS}`;
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
