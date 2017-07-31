import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { CommonModule } from "@angular/common";

import { WakeupCommonModule } from "../../common/common.module";
import { AnswersComponent } from "./answers.component";
import { WakeupEditAnswerDialogComponent } from "./components/wakeup-edit-answer-dialog/wakeup-edit-answer-dialog.component";
@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    WakeupCommonModule
  ],
  exports: [],
  declarations: [AnswersComponent, WakeupEditAnswerDialogComponent],
  providers: [],
  entryComponents: [WakeupEditAnswerDialogComponent]
})
export class AnswersModule {}
