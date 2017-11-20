import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { catchError } from 'rxjs/operators';
import appConstants from '../common/app-constants';
import { environment } from '../../environments/environment';
import { AuthTokenService } from '../common/services/authToken.service';

import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';

@Injectable()
export class InterceptedHttp implements HttpInterceptor {
    private authService: AuthTokenService = new AuthTokenService();
    private router;
    constructor(private injector: Injector) {
        this.router = this.injector.get(Router);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken() || undefined;
        const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
            url: this.updateUrl(req.url)
        });

        return next.handle(authReq)
            .pipe(
            catchError((res: any) => {
                if (res instanceof HttpErrorResponse
                    && (res.status === appConstants.errorCode.Unauthorized ||
                        res.status === appConstants.errorCode.Forbidden)) {
                    // handle authorization errors
                    this.authService.removeStoredToken();
                    if (this.router.url.indexOf(appConstants.routes.LOGIN) === -1) {
                        this.router.navigate([appConstants.routes.LOGIN]);
                    }
                }
                return Observable.throw(res);
            }));
    }

    private updateUrl(req: string) {
        return environment.serverURL + req;
    }

}
