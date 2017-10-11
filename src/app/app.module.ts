import 'hammerjs';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpModule, Http, XHRBackend, RequestOptions } from "@angular/http";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { Router } from "@angular/router";
import {
  QuestionSetEffects,
  QuestionEffects,
  QuoteEffects,
  TopicEffects,
  AnswerEffectsIndexedDB
} from "./common/store";
import { reducers } from "./common/store/app.store";

import { environment } from '../environments/environment';
import { httpFactory } from "./config/http.factory";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NewQuestionSetComponent } from "./pages/new-question-set/new-question-set.component";
import { TopicsComponent } from "./pages/topics/topics.component";
import { NewTopicComponent } from "./pages/new-topic/new-topic.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { QuotesComponent } from "./pages/quotes/quotes.component";
import { NewQuoteComponent } from "./pages/new-quote/new-quote.component";
import { PracticeSessionComponent } from "./pages/practice-session/practice-session.component";
import { ProfileComponent } from './pages/profile/profile.component';


import { WakeupCommonModule } from "./common/common.module";
import { SharedModule } from './_shared/shared.module';
import { LoginModule } from "./pages/login/login.module";
import { QuestionSetsModule } from "./pages/question-sets/question-sets.module";
import { TopicDetailsModule } from "./pages/topic-details/topic-details.module";



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NewQuestionSetComponent,
    TopicsComponent,
    NewTopicComponent,
    QuotesComponent,
    NewQuoteComponent,
    PracticeSessionComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModule,
    WakeupCommonModule,
    LoginModule,
    TopicDetailsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : [],
    EffectsModule.forRoot([
      QuestionSetEffects,
      QuestionEffects,
      QuoteEffects,
      TopicEffects,
      AnswerEffectsIndexedDB
    ])
  ],

  exports: [QuestionSetsModule],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, Router]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
