import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { QuestionSetsModule } from '../question-sets/question-sets.module';
import { TopicDetailsComponent } from './topic-details.component';
import { AppAssociateQuestionSetComponent } from './components/app-associate-question-set/app-associate-question-set.component';

@NgModule({
  imports: [
    SharedModule,
    QuestionSetsModule,
  ],
  exports: [],
  declarations: [
    TopicDetailsComponent,
    AppAssociateQuestionSetComponent,
  ],
  providers: [],
})
export class TopicDetailsModule {}
