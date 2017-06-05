import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';
import { UserDetailResolver } from './guards/user-details.resolver';
import { QuestionSetDetailsResolver} from './guards/question-set-details.resolver';
import { LoginService, AuthTokenService, QuestionSetService } from './services';
import { WakeupTopBarComponent } from './components/wakeup-top-bar/wakeup-top-bar.component';
import { WakeupSideNavComponent } from './components/wakeup-side-nav/wakeup-side-nav.component';

@NgModule({
  imports: [
    MaterialModule, 
    CommonModule, 
    RouterModule
  ],
  declarations: [
    WakeupTopBarComponent, 
    WakeupSideNavComponent
  ],
  providers: [
    AuthTokenService, 
    LoginService, 
    QuestionSetService, 
    AuthenticationGuard,
    UserDetailResolver,
    QuestionSetDetailsResolver
  ],
  exports: [
    WakeupTopBarComponent,
    WakeupSideNavComponent, 
    MaterialModule 
  ],
})
export class WakeupCommonModule { }
