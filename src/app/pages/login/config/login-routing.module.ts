import { LoginWakeupCallComponent } from '../views/login-wakeup-call/login-wakeup-call.component';
import { SignupWakeupCallComponent } from '../views/signup-wakeup-call/signup-wakeup-call.component';
import { LoginComponent } from '../login.component';
import { GoogleComponent } from '../google/google.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


export const loginChildRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: 'wakeupcallapp', pathMatch: 'full' },
      { path: 'wakeupcallapp', component: LoginWakeupCallComponent, data: { 'title': 'Login' } },
      { path: 'signup', component: SignupWakeupCallComponent, data: { 'title': 'Signup' } },
      { path: 'google', component: GoogleComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginChildRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
