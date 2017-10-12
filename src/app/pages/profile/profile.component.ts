import { Component, OnInit } from '@angular/core';
import { LoginApi } from 'app/common/services';

@Component({
  selector: 'wakeup-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: { 'class': 'pageContent' }
})
export class ProfileComponent implements OnInit {
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
