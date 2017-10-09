import { NgModule } from "@angular/core";
import { MaterialModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

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
import { WakeupCardComponent } from "./components/wakeup-card/wakeup-card.component";
import { WakeupImportFileComponent } from "./components/wakeup-import-file/wakeup-import-file.component";
import { WakeupConfirmDialogComponent } from './components/wakeup-confirm-dialog/wakeup-confirm-dialog.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    WakeupTopBarComponent,
    WakeupSideNavComponent,
    WakeupCardComponent,
    WakeupImportFileComponent,
    WakeupConfirmDialogComponent
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
    WakeupSideNavComponent,
    WakeupCardComponent,
    MaterialModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [WakeupImportFileComponent, WakeupConfirmDialogComponent]
})
export class WakeupCommonModule {}
