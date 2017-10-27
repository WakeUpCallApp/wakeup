import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AuthenticationGuard, CanDeactivateGuard, UserDetailResolver } from '@app/common';

import { LandingComponent } from './landing/landing.component';
import { QuestionSetsComponent } from './question-sets/question-sets.component';
import { NewQuestionSetComponent } from './new-question-set/new-question-set.component';
import { TopicsComponent } from './topics/topics.component';
import { NewTopicComponent } from './new-topic/new-topic.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { QuotesComponent } from './quotes/quotes.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { PracticeSessionComponent } from './practice-session/practice-session.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'landing',
                component: LandingComponent,
                data: { title: 'Landing Page' }
            },
            {
                path: 'questionSets',
                component: QuestionSetsComponent,
                data: { title: 'Question Sets' },
                canActivate: [AuthenticationGuard],
                resolve: { userDetails: UserDetailResolver }
            },
            {
                path: 'newQuestionSet',
                component: NewQuestionSetComponent,
                data: { title: 'New Question' },
                canActivate: [AuthenticationGuard],
                resolve: { userDetails: UserDetailResolver }
            },
            {
                path: 'questionSetDetails/:id',
                loadChildren: 'app/pages/question-set-details/question-set-details.module#QuestionSetDetailsModule',
                canActivate: [AuthenticationGuard],
                resolve: {
                    userDetails: UserDetailResolver
                }
            },
            {
                path: 'topics',
                component: TopicsComponent,
                data: { title: 'Topics' },
                canActivate: [AuthenticationGuard],
                resolve: { userDetails: UserDetailResolver }
            },
            {
                path: 'newTopic',
                component: NewTopicComponent,
                data: { title: 'New Topic' },
                canActivate: [AuthenticationGuard],
                resolve: { userDetails: UserDetailResolver }
            },
            {
                path: 'topicDetails/:id',
                component: TopicDetailsComponent,
                canActivate: [AuthenticationGuard],
                resolve: {
                    userDetails: UserDetailResolver
                }
            },
            {
                path: 'quotes/:topicId',
                component: QuotesComponent,
                canActivate: [AuthenticationGuard],
                resolve: {
                    userDetails: UserDetailResolver
                }
            },
            {
                path: 'newQuote/:topicId',
                component: NewQuoteComponent,
                data: { title: 'New Quote' },
                canActivate: [AuthenticationGuard],
                resolve: { userDetails: UserDetailResolver }
            },
            {
                path: 'quoteDetails/:id/:topicId',
                loadChildren: 'app/pages/quote-details/quote-details.module#QuoteDetailsModule',
                canActivate: [AuthenticationGuard],
                resolve: {
                    userDetails: UserDetailResolver
                }
            },
            {
                path: 'practiceSession/:questionSetId',
                component: PracticeSessionComponent,
                canActivate: [AuthenticationGuard],
                canDeactivate: [CanDeactivateGuard],
                resolve: { userDetails: UserDetailResolver }
            },
            {
                path: 'answers/:questionId',
                loadChildren: 'app/pages/answers/answers.module#AnswersModule',
                canActivate: [AuthenticationGuard],
                resolve: { userDetails: UserDetailResolver }
            },
            {
                path: 'sessionDetails/:questionSetId/:questionSetName',
                loadChildren: 'app/pages/session-details/session-details.module#SessionDetailsModule',
                canActivate: [AuthenticationGuard],
                resolve: { userDetails: UserDetailResolver }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: { title: 'Profile' },
                canActivate: [AuthenticationGuard],
                resolve: {
                    userDetails: UserDetailResolver
                }
            },
            { path: '', redirectTo: 'questionSets', pathMatch: 'full' },
            { path: '**', redirectTo: 'questionSets', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
