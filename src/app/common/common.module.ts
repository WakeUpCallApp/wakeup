import { NgModule } from '@angular/core';
import {
  SharedModule
} from '../_shared/shared.module';
import { AuthenticationGuard } from './guards/authentication.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { UserDetailResolver } from './guards/user-details.resolver';
import {
  LoginApi,
  AuthTokenService,
  QuestionSetApi,
  QuestionApi,
  QuoteApi,
  TopicApi,
  SessionConfigService,
  FileParsingService,
  NotificationService,
  DialogService,
  AnswersIndexedDbApi
} from './services';

import {
  AnswerStoreService,
  QuestionStoreService,
  QuestionSetStoreService,
  QuoteStoreService,
  TopicStoreService,
  LoginStoreService
} from './store';

import { AppTopBarComponent } from './components/app-top-bar/app-top-bar.component';
import { AppSideNavComponent } from './components/app-side-nav/app-side-nav.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';


const storeServices = [
  AnswerStoreService,
  QuestionStoreService,
  QuestionSetStoreService,
  QuoteStoreService,
  TopicStoreService,
  LoginStoreService
]

const apiServices = [
  LoginApi,
  QuestionSetApi,
  QuestionApi,
  QuoteApi,
  TopicApi,
  AnswersIndexedDbApi
];

const services = [
  AuthTokenService,
  SessionConfigService,
  FileParsingService,
  NotificationService,
  DialogService,
];

const guards = [
  AuthenticationGuard,
  CanDeactivateGuard,
  UserDetailResolver
];

@NgModule({
  imports: [SharedModule],
  declarations: [
    AppTopBarComponent,
    AppSideNavComponent,
    AppFooterComponent
  ],
  providers: [
    ...services,
    ...apiServices,
    ...storeServices,
    ...guards

  ],
  exports: [
    AppTopBarComponent,
    AppSideNavComponent,
    AppFooterComponent]
})
export class WakeupCommonModule { }
