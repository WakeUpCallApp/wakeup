import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';

import { NewQuestionSetComponent } from './new-question-set/new-question-set.component';
import { TopicsComponent } from './topics/topics.component';
import { NewTopicComponent } from './new-topic/new-topic.component';
import { LandingComponent } from './landing/landing.component';
import { QuotesComponent } from './quotes/quotes.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { PracticeSessionComponent } from './practice-session/practice-session.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginModule } from './login/login.module';
import { QuestionSetsModule } from './question-sets/question-sets.module';
import { TopicDetailsModule } from './topic-details/topic-details.module';
import { PagesRoutingModule } from './pages.routing';

const components = [
    LandingComponent,
    NewQuestionSetComponent,
    TopicsComponent,
    NewTopicComponent,
    QuotesComponent,
    NewQuoteComponent,
    PracticeSessionComponent,
    ProfileComponent
];
const modules = [
    SharedModule,
    LoginModule,
    TopicDetailsModule,
    QuestionSetsModule,
    PagesRoutingModule
];

@NgModule({
    declarations: [...components],
    imports: [...modules],
    exports: [PagesRoutingModule]
})
export class PagesModule { }
