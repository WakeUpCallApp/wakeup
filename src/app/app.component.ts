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
  public canShowTopBar: boolean;
  private userDetailsSubscription;

  constructor(private router: Router,
    private loginService: LoginService,
    private authTokenService: AuthTokenService) { }

  ngOnInit() {
    if (!this.loginService.getCurrentUser()) {
      this.userDetailsSubscription = this.loginService.getUserDetails().subscribe((user) => {
        this.canShowTopBar = this.canShowNavigation();
        this.isOpen = this.canShowTopBar && window.innerWidth > 600;
      });
    }
  }

  ngOnDestroy() {
    this.userDetailsSubscription.unsubscribe();
  }

  openMenu(isOpen) {
    this.isOpen = isOpen;
  }

  canShowNavigation() {
    return location.pathname.indexOf(appConstants.routes.LANDING) === -1 &&
      location.pathname.indexOf(appConstants.routes.LOGIN) === -1;
  }

  logout(): void {
    this.loginService.logout();
    this.isOpen = false;
    this.router.navigate(['/login']);
  }
}
