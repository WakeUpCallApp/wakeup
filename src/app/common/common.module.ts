import { NgModule } from "@angular/core";
import {
  SharedModule
} from '../_shared/shared.module';
import { AuthenticationGuard } from "./guards/authentication.guard";
import { CanDeactivateGuard } from "./guards/can-deactivate.guard";
import { UserDetailResolver } from "./guards/user-details.resolver";
import {
  LoginApi,
  AuthTokenService,
  QuestionSetApi,
  QuestionApi,
  QuoteApi,
  TopicApi,
  AnswerApi,
  SessionConfigService,
  FileParsingService,
  NotificationService,
  DialogService,
  AnswersIndexedDbApi
} from "./services";

import {
  AnswerStoreService,
  QuestionStoreService,
  QuestionSetStoreService,
  QuoteStoreService,
  TopicStoreService,
  LoginStoreService
} from './store';

import { WakeupTopBarComponent } from "./components/wakeup-top-bar/wakeup-top-bar.component";
import { WakeupSideNavComponent } from "./components/wakeup-side-nav/wakeup-side-nav.component";
import { WakeupFooterComponent } from './components/wakeup-footer/wakeup-footer.component';

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
  AnswerApi,
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
    WakeupTopBarComponent,
    WakeupSideNavComponent,
    WakeupFooterComponent
  ],
  providers: [
    ...services,
    ...apiServices,
    ...storeServices,
    ...guards

  ],
  exports: [
    WakeupTopBarComponent,
    WakeupFooterComponent,
    WakeupSideNavComponent]
})
export class WakeupCommonModule { }
