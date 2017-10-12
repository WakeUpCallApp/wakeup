import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { QuestionSetsComponent } from './question-sets.component';
import { AppQuestionSetsListComponent } from './components/app-question-sets-list/app-question-sets-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [AppQuestionSetsListComponent],
  declarations: [
    QuestionSetsComponent,
    AppQuestionSetsListComponent
  ],
  providers: [],
})
export class QuestionSetsModule {}
