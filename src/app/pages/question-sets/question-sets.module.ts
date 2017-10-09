import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { QuestionSetsComponent } from './question-sets.component';
import { WakeupQuestionSetsListComponent } from './components/wakeup-question-sets-list/wakeup-question-sets-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [WakeupQuestionSetsListComponent],
  declarations: [
    QuestionSetsComponent,
    WakeupQuestionSetsListComponent
  ],
  providers: [],
})
export class QuestionSetsModule {}
