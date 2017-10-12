import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { QuestionSetDetailsComponent } from './question-set-details.component';
import {
  AppAddQuestionComponent,
  AppQuestionListComponent,
  AppQuotesBrowserComponent,
  AppEditQuestionDialogComponent,
  AppSessionConfigComponent
} from './components';

import { routing } from './question-set-details.routing';


@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [
    AppQuotesBrowserComponent,
    QuestionSetDetailsComponent,
    AppAddQuestionComponent,
    AppQuestionListComponent,
    AppEditQuestionDialogComponent,
    AppSessionConfigComponent
  ],
  providers: [],
  entryComponents: [
    AppQuotesBrowserComponent,
    AppEditQuestionDialogComponent,
    AppSessionConfigComponent]
})
export class QuestionSetDetailsModule { }
