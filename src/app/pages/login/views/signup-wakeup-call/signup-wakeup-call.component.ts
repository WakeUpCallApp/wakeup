import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../common/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-wakeup-call',
  templateUrl: './signup-wakeup-call.component.html',
  styleUrls: ['./signup-wakeup-call.component.scss']
})
export class SignupWakeupCallComponent implements OnInit {
  public user = {
    name: '',
    email: '',
    password: ''
  };
  signUpInvalid: boolean;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  loginOauth(provider) {
    window.location.href = '/auth/' + provider;
  };

  signUp() {
    this.loginService.signUp(this.user).subscribe(resp => {
      console.log(resp);
      //todo: treat errors
        this.router.navigate(['landing']);
    });
  }

}
