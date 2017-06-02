import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';


import { AuthTokenService } from './services/authToken.service';
import { LoginService } from './services/login.service';
import { WakeupTopBarComponent } from './components/wakeup-top-bar/wakeup-top-bar.component';
import { WakeupSideNavComponent } from './components/wakeup-side-nav/wakeup-side-nav.component';

@NgModule({
  imports: [MaterialModule, CommonModule, RouterModule],
  declarations: [WakeupTopBarComponent, WakeupSideNavComponent],
  providers: [AuthTokenService, LoginService],
  exports: [WakeupTopBarComponent,WakeupSideNavComponent, MaterialModule ],
})
export class WakeupCommonModule { }
