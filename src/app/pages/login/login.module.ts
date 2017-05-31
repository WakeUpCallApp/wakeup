import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { LoginComponent } from './login.component';
import { LoginWakeupCallComponent } from './views/login-wakeup-call/login-wakeup-call.component';
import { SignupWakeupCallComponent } from './views/signup-wakeup-call/signup-wakeup-call.component';
import { LoginRoutingModule } from './config/login-routing.module';

@NgModule({
  imports: [ RouterModule, FormsModule, MaterialModule, LoginRoutingModule ],
  exports: [LoginRoutingModule],
  declarations: [LoginComponent, LoginWakeupCallComponent, SignupWakeupCallComponent],
  providers: [ ],
})
export class LoginModule { }
