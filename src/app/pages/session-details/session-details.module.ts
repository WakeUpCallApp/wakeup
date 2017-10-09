import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { SessionDetailsComponent } from './session-details.component';
import { WakeupAnswersListComponent } from './components/wakeup-answers-list/wakeup-answers-list.component';
import { routing } from './session-details.routing';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [
    SessionDetailsComponent,
    WakeupAnswersListComponent,
  ],
  providers: [],
})
export class SessionDetailsModule {}
