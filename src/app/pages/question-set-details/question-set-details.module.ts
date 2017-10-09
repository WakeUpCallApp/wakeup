import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { QuestionSetDetailsComponent } from './question-set-details.component';
import { WakeupAddQuestionComponent } from './components/wakeup-add-question/wakeup-add-question.component';
import { WakeupQuestionListComponent } from './components/wakeup-question-list/wakeup-question-list.component';
import { WakeupQuotesBrowserComponent } from './components/wakeup-quotes-browser/wakeup-quotes-browser.component';
import { WakeupEditQuestionDialogComponent } from './components/wakeup-edit-question-dialog/wakeup-edit-question-dialog.component';
import { WakeupSessionConfigComponent } from './components/wakeup-session-config/wakeup-session-config.component';
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
  entryComponents: [WakeupQuotesBrowserComponent,  WakeupEditQuestionDialogComponent, WakeupSessionConfigComponent]
})
export class QuestionSetDetailsModule {}
