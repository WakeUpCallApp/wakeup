import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { CommonModule } from "@angular/common";

import { WakeupCommonModule } from "../../common/common.module";
import { QuestionSetDetailsComponent } from "./question-set-details.component";
import { WakeupQuestionComponent } from "./components/wakeup-question/wakeup-question.component";
import { WakeupQuestionListComponent } from "./components/wakeup-question-list/wakeup-question-list.component";
import { WakeupQuotesBrowserComponent } from "./components/wakeup-quotes-browser/wakeup-quotes-browser.component";

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    WakeupCommonModule
  ],
  exports: [],
  declarations: [
    WakeupQuotesBrowserComponent,
    QuestionSetDetailsComponent,
    WakeupQuestionComponent,
    WakeupQuestionListComponent
  ],
  providers: [],
  entryComponents: [WakeupQuotesBrowserComponent]
})
export class QuestionSetDetailsModule {}
