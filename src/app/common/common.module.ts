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
import { WakeupTopBarComponent } from "./components/wakeup-top-bar/wakeup-top-bar.component";
import { WakeupSideNavComponent } from "./components/wakeup-side-nav/wakeup-side-nav.component";
import { WakeupFooterComponent } from './components/wakeup-footer/wakeup-footer.component';


@NgModule({
  imports: [SharedModule],
  declarations: [
    WakeupTopBarComponent,
    WakeupSideNavComponent,
    WakeupFooterComponent
  ],
  providers: [
    AuthTokenService,
    SessionConfigService,
    LoginApi,
    QuestionSetApi,
    QuestionApi,
    QuoteApi,
    TopicApi,
    AnswerApi,
    AuthenticationGuard,
    CanDeactivateGuard,
    UserDetailResolver,
    FileParsingService,
    NotificationService,
    DialogService,
    AnswersIndexedDbApi
  ],
  exports: [
    WakeupTopBarComponent,
    WakeupFooterComponent,
    WakeupSideNavComponent]
})
export class WakeupCommonModule { }
