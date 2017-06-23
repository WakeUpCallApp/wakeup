import { NgModule } from "@angular/core";

import { WakeupCommonModule } from "../../common/common.module";
import { QuestionSetsModule } from '../question-sets/question-sets.module';
import { TopicDetailsComponent } from './topic-details.component';
import { WakeupAssociateQuestionSetComponent } from './components/wakeup-associate-question-set/wakeup-associate-question-set.component';

@NgModule({
  imports: [
    WakeupCommonModule,
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
