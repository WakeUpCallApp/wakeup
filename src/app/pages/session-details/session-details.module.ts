import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { SessionDetailsComponent } from './session-details.component';
import { AppAnswersListComponent } from './components/app-answers-list/app-answers-list.component';
import { routing } from './session-details.routing';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [
    SessionDetailsComponent,
    AppAnswersListComponent,
  ],
  providers: [],
})
export class SessionDetailsModule {}
