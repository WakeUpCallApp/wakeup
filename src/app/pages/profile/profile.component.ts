import { Component, OnInit } from '@angular/core';
import { LoginService } from "app/common/services";

@Component({
  selector: 'wakeup-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  oldPassword;
  newPassword;
  errorMessage;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  updatePassword() {
    this.loginService
    .changePassword(this.oldPassword, this.newPassword)
    .subscribe(() => {}, () => {
       this.errorMessage = "incorrect password";
    });
  }

}
