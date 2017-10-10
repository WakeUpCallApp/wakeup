import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { Title } from "@angular/platform-browser";
import { Store } from '@ngrx/store';
import * as reducers from './common/reducers';
import { LoginApi } from "./common/services/api/login.api";
import { AuthTokenService } from "./common/services/authToken.service";
import appConstants from "./common/app-constants";
import { addEvent } from "./common/util";
import { NotificationService } from "app/common/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  public isOpen = false;

  constructor(
    private router: Router,
    public loginApi: LoginApi,
    private authTokenService: AuthTokenService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService,
    private store: Store<reducers.State>
  ) { }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === "primary")
      .mergeMap(route => route.data)
      .subscribe(event => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(title);
        }
      });

    addEvent(window, "resize", e => {
      if (this.isOpen) {
        this.isOpen = window.innerWidth < 1000;
      }
    });

    this.notificationService.subj_notification.subscribe(
      (notification: any) => {
        this.openSnackBar(notification);
      }
    );
  }

  ngOnDestroy() {
    window.document.removeEventListener("resize");
  }

  openMenu(isOpen) {
    this.isOpen = isOpen;
  }

  canShowNavigation() {
    return (
      this.authTokenService.isLoggedIn() &&
      location.pathname.indexOf(appConstants.routes.LANDING) === -1 &&
      location.pathname.indexOf(appConstants.routes.LOGIN) === -1 &&
      location.pathname.indexOf(appConstants.routes.PRACTICE_SESSION) === -1
    );
  }

  canShowFooter() {
    return this.loginApi.getCurrentUser() &&
      location.pathname.indexOf(appConstants.routes.PRACTICE_SESSION) === -1;
  }

  logout(): void {
    this.store.dispatch({ type: 'USER_LOGOUT' });
    this.loginApi.logout();
    this.isOpen = false;
    this.router.navigate([appConstants.routes.LOGIN]);
  }

  openSnackBar({ message, action = "", config }) {
    const conf = new MatSnackBarConfig();
    conf.duration = 10000;
    conf.extraClasses = [config.extraClass];
    this.snackBar.open(message, action, conf);
  }
}
