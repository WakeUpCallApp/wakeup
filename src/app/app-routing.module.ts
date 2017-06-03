import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthenticationGuard } from './common/guards/authentication.guard';
import { LandingComponent } from './pages/landing/landing.component';
import { QuestionSetsComponent } from './pages/question-sets/question-sets.component';

@NgModule({
	imports: [
	RouterModule.forRoot([
	{ path: 'landing',
	  component: LandingComponent,
    data: { title: 'Landing Page' }
	},
	{path: 'questionSets', component: QuestionSetsComponent, canActivate: [AuthenticationGuard] },
	{ path: '', redirectTo: 'questionSets', pathMatch: 'full' },
	{ path: '**', redirectTo: 'questionSets', pathMatch: 'full' }
	])
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule {};
