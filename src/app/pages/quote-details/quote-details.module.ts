import { NgModule } from '@angular/core';

import { routing } from './quote-details.routing';
import { SharedModule } from '../../_shared/shared.module';
import { QuoteDetailsComponent } from './quote-details.component';
import { WakeupAddCommentComponent } from './components/wakeup-add-comment/wakeup-add-comment.component';
import { WakeupCommentListComponent } from './components/wakeup-comment-list/wakeup-comment-list.component';
import { WakeupQuoteQuestionsComponent } from './components/wakeup-quote-questions/wakeup-quote-questions.component';
import { WakeupQuestionsBrowserComponent } from './components/wakeup-questions-browser/wakeup-questions-browser.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [
    QuoteDetailsComponent,
    WakeupAddCommentComponent,
    WakeupCommentListComponent,
    WakeupQuoteQuestionsComponent,
    WakeupQuestionsBrowserComponent
  ],
  providers: [],
  entryComponents: [WakeupQuestionsBrowserComponent]
})
export class QuoteDetailsModule { }
