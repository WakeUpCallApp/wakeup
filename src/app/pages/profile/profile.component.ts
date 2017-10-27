import { Component, OnDestroy, HostBinding } from '@angular/core';
import { LoginApi } from '@app/common';
import appConstants from '@app/common/app-constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {
  @HostBinding('class') classes = `${appConstants.ui.PAGE_CONTAINER_CLASS}`;
  oldPassword;
  newPassword;
  errorMessage;
  private apiSubscription;
  constructor(private loginApi: LoginApi) { }

  ngOnDestroy() {
    if (this.apiSubscription) { this.apiSubscription.unsubscribe() };
  }

  updatePassword() {
    this.apiSubscription = this.loginApi
      .changePassword(this.oldPassword, this.newPassword)
      .subscribe(() => { }, () => {
        this.errorMessage = 'incorrect password';
      });
  }

}
