import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-wakeup-call',
  templateUrl: './login-wakeup-call.component.html',
  styleUrls: ['./login-wakeup-call.component.scss']
})
export class LoginWakeupCallComponent implements OnInit {
public user = {
  email: '',
  password: ''
};
  constructor() { }

  ngOnInit() {
  }

}
