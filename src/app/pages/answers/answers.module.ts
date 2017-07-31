import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { CommonModule } from "@angular/common";

import { WakeupCommonModule } from "../../common/common.module";
import { AnswersComponent } from "./answers.component";
import { WakeupAnswerDialogComponent } from "./components/wakeup-answer-dialog/wakeup-answer-dialog.component";
@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    WakeupCommonModule
  ],
  exports: [],
  declarations: [AnswersComponent, WakeupAnswerDialogComponent],
  providers: [],
  entryComponents: [WakeupAnswerDialogComponent]
})
export class AnswersModule {}
