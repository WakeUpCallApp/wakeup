import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { QuestionSetDetailsComponent } from './question-set-details.component';
import {
  WakeupAddQuestionComponent,
  WakeupQuestionListComponent,
  WakeupQuotesBrowserComponent,
  WakeupEditQuestionDialogComponent,
  WakeupSessionConfigComponent
} from './components';

import { routing } from './question-set-details.routing';


@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [
    WakeupQuotesBrowserComponent,
    QuestionSetDetailsComponent,
    WakeupAddQuestionComponent,
    WakeupQuestionListComponent,
    WakeupEditQuestionDialogComponent,
    WakeupSessionConfigComponent
  ],
  providers: [],
  entryComponents: [
    WakeupQuotesBrowserComponent,
    WakeupEditQuestionDialogComponent,
    WakeupSessionConfigComponent]
})
export class QuestionSetDetailsModule { }
