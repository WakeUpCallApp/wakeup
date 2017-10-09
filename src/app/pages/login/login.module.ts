import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../_shared/shared.module';

import { LoginComponent } from './login.component';
import { LoginWakeupCallComponent } from './views/login-wakeup-call/login-wakeup-call.component';
import { SignupWakeupCallComponent } from './views/signup-wakeup-call/signup-wakeup-call.component';
import { LoginRoutingModule } from './config/login-routing.module';
import { GoogleComponent } from './google/google.component';

@NgModule({
  imports: [ RouterModule, SharedModule, LoginRoutingModule, CommonModule ],
  exports: [LoginRoutingModule],
  declarations: [LoginComponent, LoginWakeupCallComponent, SignupWakeupCallComponent, GoogleComponent],
  providers: [ ],
})
export class LoginModule { }
