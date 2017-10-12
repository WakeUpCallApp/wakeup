import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { routing } from './answers.routing';
import { SharedModule } from '../../_shared/shared.module';
import { AnswersComponent } from './answers.component';
import { WakeupAnswerDialogComponent } from './components/wakeup-answer-dialog/wakeup-answer-dialog.component';
@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [AnswersComponent, WakeupAnswerDialogComponent],
  providers: [],
  entryComponents: [WakeupAnswerDialogComponent]
})
export class AnswersModule {}
