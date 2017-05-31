import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { environment } from '../../environments/environment';
import { AuthTokenService } from '../common/services/authToken.service';
import { Router } from '@angular/router';

@Injectable()
export class InterceptedHttp extends Http {
    private authService: AuthTokenService = new AuthTokenService();
    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                private router: Router) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options).catch(this.catchErrors());
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options)).catch(this.catchErrors());
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options)).catch(this.catchErrors());
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options)).catch(this.catchErrors());
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options)).catch(this.catchErrors());
    }

    private updateUrl(req: string) {
        return  environment.serverURL + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
         let token = this.authService.getToken() || {};
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Authorization', `Bearer ${token}`)

        return options;
    }

    private catchErrors() {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        //handle authorization errors
        this.authService.removeStoredToken();
        this.router.navigate(['login']);
      }
      return Observable.throw(res);
    };
  }
}
