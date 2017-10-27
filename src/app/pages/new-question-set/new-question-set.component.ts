import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuestionSetStoreService, IQuestionSet } from '@app/common';
import appConstants from '@app/common/app-constants';

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
