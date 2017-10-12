import { Component, OnInit, HostBinding } from '@angular/core';
import { LoginApi } from 'app/common/services';
import appConstants from '../../common/app-constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @HostBinding('class') classes = `${appConstants.ui.PAGE_CONTAINER_CLASS}`;
  oldPassword;
  newPassword;
  errorMessage;
  constructor(private loginApi: LoginApi) { }

  ngOnInit() {
  }

  updatePassword() {
    this.loginApi
      .changePassword(this.oldPassword, this.newPassword)
      .subscribe(() => { }, () => {
        this.errorMessage = 'incorrect password';
      });
  }

}
