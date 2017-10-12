import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { routing } from './answers.routing';
import { SharedModule } from '../../_shared/shared.module';
import { AnswersComponent } from './answers.component';
import { AppAnswerDialogComponent } from './components/app-answer-dialog/app-answer-dialog.component';
@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [AnswersComponent, AppAnswerDialogComponent],
  providers: [],
  entryComponents: [AppAnswerDialogComponent]
})
export class AnswersModule {}
