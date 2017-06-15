import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoginService } from './common/services/login.service';
import { AuthTokenService } from './common/services/authToken.service';
import appConstants from './common/app-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isOpen: boolean = false;

  constructor(private router: Router,
    private loginService: LoginService,
    private authTokenService: AuthTokenService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) { }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));
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
