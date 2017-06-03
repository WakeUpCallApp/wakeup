import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  public canShowTopBar: boolean;

  constructor(private router: Router,
    private loginService: LoginService,
    private authTokenService: AuthTokenService) {
  }
  ngOnInit() {
      this.loginService.checkAuthenticationStatus().subscribe(() => {
        this.canShowTopBar = this.canShowNavigation();
        if (this.canShowTopBar) {
          this.isOpen = window.innerWidth > 600;
        }
      });
  }

  openMenu(isOpen) {
    this.isOpen = isOpen;
  }

  canShowNavigation() {
    return this.loginService.isAuthenticated() && 
      location.pathname.indexOf(appConstants.routes.LANDING) === -1 &&
      location.pathname.indexOf(appConstants.routes.LOGIN) === -1;
  }

  logout(): void {
    this.loginService.logout();
    this.isOpen = false;
    this.router.navigate(['/login']);
  }
}
