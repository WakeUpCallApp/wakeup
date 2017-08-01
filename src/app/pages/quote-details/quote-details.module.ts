import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { WakeupCommonModule } from '../../common/common.module';
import { QuoteDetailsComponent } from './quote-details.component';

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
    QuoteDetailsComponent
  ],
  providers: [],
  entryComponents: []
})
export class QuoteDetailsModule {}
