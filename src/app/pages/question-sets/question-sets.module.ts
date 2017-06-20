import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { CommonModule } from "@angular/common";

import { WakeupCommonModule } from "../../common/common.module";
import { QuestionSetsComponent } from './question-sets.component';
import { WakeupQuestionSetsListComponent } from './components/wakeup-question-sets-list/wakeup-question-sets-list.component';

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
    QuestionSetsComponent,
    WakeupQuestionSetsListComponent
  ],
  providers: [],
})
export class QuestionSetsModule {}
