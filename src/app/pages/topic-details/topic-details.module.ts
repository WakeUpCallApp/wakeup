import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { QuestionSetsModule } from '../question-sets/question-sets.module';
import { TopicDetailsComponent } from './topic-details.component';
import { WakeupAssociateQuestionSetComponent } from './components/wakeup-associate-question-set/wakeup-associate-question-set.component';

@NgModule({
  imports: [
    SharedModule,
    QuestionSetsModule,
  ],
  exports: [],
  declarations: [
    TopicDetailsComponent,
    WakeupAssociateQuestionSetComponent,
  ],
  providers: [],
})
export class TopicDetailsModule {}
