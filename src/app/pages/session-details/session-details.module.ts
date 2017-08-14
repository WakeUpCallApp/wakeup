import { NgModule } from '@angular/core';

import { WakeupCommonModule } from '../../common/common.module';
import { SessionDetailsComponent } from './session-details.component';
import { WakeupAnswersListComponent } from './components/wakeup-answers-list/wakeup-answers-list.component';

@NgModule({
  imports: [
    WakeupCommonModule,
  ],
  exports: [],
  declarations: [
    SessionDetailsComponent,
    WakeupAnswersListComponent,
  ],
  providers: [],
})
export class SessionDetailsModule {}
