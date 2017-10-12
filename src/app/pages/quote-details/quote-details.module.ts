import { NgModule } from '@angular/core';

import { routing } from './quote-details.routing';
import { SharedModule } from '../../_shared/shared.module';
import { QuoteDetailsComponent } from './quote-details.component';
import { AppAddCommentComponent } from './components/app-add-comment/app-add-comment.component';
import { AppCommentListComponent } from './components/app-comment-list/app-comment-list.component';
import { AppQuoteQuestionsComponent } from './components/app-quote-questions/app-quote-questions.component';
import { AppQuestionsBrowserComponent } from './components/app-questions-browser/app-questions-browser.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [
    QuoteDetailsComponent,
    AppAddCommentComponent,
    AppCommentListComponent,
    AppQuoteQuestionsComponent,
    AppQuestionsBrowserComponent
  ],
  providers: [],
  entryComponents: [AppQuestionsBrowserComponent]
})
export class QuoteDetailsModule { }
