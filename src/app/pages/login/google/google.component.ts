import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from '../../../common/services/authToken.service';
import appConstants from '../../../common/app-constants';


@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  constructor(
    private authService: AuthTokenService,
    private router: Router) { }

  ngOnInit() {
    const token = window.location.search.split('token=')[1];
    this.authService.setToken(token);
    this.router.navigate([appConstants.routes.QUESTION_SETS]);
  }

}
