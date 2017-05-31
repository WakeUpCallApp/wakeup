import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {InterceptedHttp} from "./http.interceptor";
import { Router } from '@angular/router';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, router);
}