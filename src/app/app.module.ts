import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MaterialModule } from '@angular/material';
import { Router } from '@angular/router';

import { QuestionSetEffects, 
  QuestionEffects, 
  QuoteEffects,
TopicEffects } from './common/effects';

import { reducer } from './common/reducers';

import { httpFactory } from './config/http.factory';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WakeupCommonModule } from './common/common.module';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginModule } from './pages/login/login.module';
import { QuestionSetsModule } from './pages/question-sets/question-sets.module';
import { NewQuestionSetComponent } from './pages/new-question-set/new-question-set.component';
import { QuestionSetDetailsModule } from './pages/question-set-details/question-set-details.module';
import { TopicsComponent } from './pages/topics/topics.component';
import { NewTopicComponent } from './pages/new-topic/new-topic.component';
import { TopicDetailsComponent } from './pages/topic-details/topic-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NewQuestionSetComponent,
    TopicsComponent,
    NewTopicComponent,
    TopicDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    WakeupCommonModule,
    LoginModule,
    QuestionSetsModule,
    QuestionSetDetailsModule,
    AppRoutingModule,
    StoreModule.provideStore(reducer),
    // must come AFTER `provideStore` call
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(QuestionSetEffects),
    EffectsModule.run(QuestionEffects),
    EffectsModule.run(QuoteEffects),
    EffectsModule.run(TopicEffects)
  ],
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
