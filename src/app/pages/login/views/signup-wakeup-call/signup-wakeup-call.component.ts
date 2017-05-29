import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
