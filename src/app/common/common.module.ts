import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthTokenService } from './services/authToken.service';
import { LoginService } from './services/login.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [AuthTokenService, LoginService],
  exports: [],
})
export class WakeupCommonModule { }
