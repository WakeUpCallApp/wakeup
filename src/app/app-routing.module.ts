import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthenticationGuard } from './common/guards/authentication.guard';
import { UserDetailResolver } from './common/guards/user-details.resolver';
import { LandingComponent } from './pages/landing/landing.component';
import { QuestionSetsComponent } from './pages/question-sets/question-sets.component';
import { NewQuestionSetComponent } from './pages/new-question-set/new-question-set.component';
import { QuestionSetDetailsComponent } from './pages/question-set-details/question-set-details.component';

@NgModule({
	imports: [
		RouterModule.forRoot([
			{
				path: 'landing',
				component: LandingComponent,
				data: { title: 'Landing Page' }
			},
			{
				path: 'questionSets',
				component: QuestionSetsComponent,
				canActivate: [AuthenticationGuard],
				resolve: { userDetails: UserDetailResolver }
			},
			{
				path: 'newQuestionSet',
				component: NewQuestionSetComponent,
				canActivate: [AuthenticationGuard],
				resolve: { userDetails: UserDetailResolver }
			},
			{
				path: 'questionSetDetails/:id',
				component: QuestionSetDetailsComponent,
				canActivate: [AuthenticationGuard],
				resolve: {
					userDetails: UserDetailResolver
				},
			},
			{ path: '', redirectTo: 'questionSets', pathMatch: 'full' },
			{ path: '**', redirectTo: 'questionSets', pathMatch: 'full' }
		])
	],
	exports: [RouterModule]
})
export class AppRoutingModule { };
