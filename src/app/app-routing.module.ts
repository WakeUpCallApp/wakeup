import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthenticationGuard } from "./common/guards/authentication.guard";
import { UserDetailResolver } from "./common/guards/user-details.resolver";
import { LandingComponent } from "./pages/landing/landing.component";
import { QuestionSetsComponent } from "./pages/question-sets/question-sets.component";
import { NewQuestionSetComponent } from "./pages/new-question-set/new-question-set.component";
import { QuestionSetDetailsComponent } from "./pages/question-set-details/question-set-details.component";
import { TopicsComponent } from "./pages/topics/topics.component";
import { NewTopicComponent } from "./pages/new-topic/new-topic.component";
import { TopicDetailsComponent } from "./pages/topic-details/topic-details.component";
import { QuotesComponent } from "./pages/quotes/quotes.component";
import { NewQuoteComponent } from "./pages/new-quote/new-quote.component";
import { PracticeSessionComponent } from "./pages/practice-session/practice-session.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: "landing",
        component: LandingComponent,
        data: { title: "Landing Page" }
      },
      {
        path: "questionSets",
        component: QuestionSetsComponent,
        data: { title: "Question Sets" },
        canActivate: [AuthenticationGuard],
        resolve: { userDetails: UserDetailResolver }
      },
      {
        path: "newQuestionSet",
        component: NewQuestionSetComponent,
        data: { title: "New Question" },
        canActivate: [AuthenticationGuard],
        resolve: { userDetails: UserDetailResolver }
      },
      {
        path: "questionSetDetails/:id",
        component: QuestionSetDetailsComponent,
        data: { title: "Question Set Details" },
        canActivate: [AuthenticationGuard],
        resolve: {
          userDetails: UserDetailResolver
        }
      },
      {
        path: "topics",
        component: TopicsComponent,
        data: { title: "Topics" },
        canActivate: [AuthenticationGuard],
        resolve: { userDetails: UserDetailResolver }
      },
      {
        path: "newTopic",
        component: NewTopicComponent,
        data: { title: "New Topic" },
        canActivate: [AuthenticationGuard],
        resolve: { userDetails: UserDetailResolver }
      },
      {
        path: "topicDetails/:id",
        component: TopicDetailsComponent,
        data: { title: "Topic Details" },
        canActivate: [AuthenticationGuard],
        resolve: {
          userDetails: UserDetailResolver
        }
      },
      {
        path: "quotes/:topicId",
        component: QuotesComponent,
        data: { title: "Quotes" },
        canActivate: [AuthenticationGuard],
        resolve: {
          userDetails: UserDetailResolver
        }
      },
      {
        path: "newQuote/:topidId",
        component: NewQuoteComponent,
        data: { title: "New Quote" },
        canActivate: [AuthenticationGuard],
        resolve: { userDetails: UserDetailResolver }
      },
      {
        path: "practiceSession/:questionSetId",
        component: PracticeSessionComponent,
        data: { title: "Practice Question Set" },
        canActivate: [AuthenticationGuard],
        resolve: { userDetails: UserDetailResolver }
      },
      { path: "", redirectTo: "questionSets", pathMatch: "full" },
      { path: "**", redirectTo: "questionSets", pathMatch: "full" }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
