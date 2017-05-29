import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
	imports: [
	RouterModule.forRoot([
	{ path: 'landing',
	  component: LandingComponent,
    data: { title: 'Landing Page' }
	},
	{ path: '', redirectTo: 'landing', pathMatch: 'full' },
	{ path: '**', redirectTo: 'landing', pathMatch: 'full' }
	])
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule {};
