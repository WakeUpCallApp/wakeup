import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './common/services/login.service';
import { AuthTokenService } from './common/services/authToken.service';
import appConstants from './common/app-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isOpen: boolean;
  private userDetailsSubscription;

  constructor(private router: Router,
    private loginService: LoginService,
    private authTokenService: AuthTokenService) { }

  ngOnInit() {
    this.isOpen = this.canShowNavigation() && window.innerWidth > 600;
  }

  ngOnDestroy() {
    this.userDetailsSubscription.unsubscribe();
  }

  openMenu(isOpen) {
    this.isOpen = isOpen;
  }

  canShowNavigation() {
    return this.authTokenService.isLoggedIn() && 
      location.pathname.indexOf(appConstants.routes.LANDING) === -1 &&
      location.pathname.indexOf(appConstants.routes.LOGIN) === -1;
  }

  logout(): void {
    this.loginService.logout();
    this.isOpen = false;
    this.router.navigate(['/login']);
  }
}
