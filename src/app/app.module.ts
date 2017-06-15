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

import { QuestionSetEffects, QuestionEffects, QuoteEffects } from './common/effects';

import { reducer } from './common/reducers';

import { httpFactory } from './config/http.factory';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WakeupCommonModule } from './common/common.module';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginModule } from './pages/login/login.module';
import { QuestionSetsComponent } from './pages/question-sets/question-sets.component';
import { NewQuestionSetComponent } from './pages/new-question-set/new-question-set.component';
import { QuestionSetDetailsModule } from './pages/question-set-details/question-set-details.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    QuestionSetsComponent,
    NewQuestionSetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    WakeupCommonModule,
    LoginModule,
    QuestionSetDetailsModule,
    AppRoutingModule,
    StoreModule.provideStore(reducer),
    // must come AFTER `provideStore` call
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(QuestionSetEffects),
    EffectsModule.run(QuestionEffects),
    EffectsModule.run(QuoteEffects)
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
