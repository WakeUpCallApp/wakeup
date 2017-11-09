import 'hammerjs';
import './rxjs.imports';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Router } from '@angular/router';
import {
  QuestionSetEffects,
  QuestionEffects,
  QuoteEffects,
  TopicEffects,
  AnswerEffectsIndexedDB
} from './common/store';
import { reducers } from './common/store/app.store';
import { environment } from '../environments/environment';
import { InterceptedHttp } from './config/http.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WakeupCommonModule } from './common/common.module';
import { SharedModule } from './_shared/shared.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    WakeupCommonModule,
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
    ]),
    PagesModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptedHttp,
    multi: true
  }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
