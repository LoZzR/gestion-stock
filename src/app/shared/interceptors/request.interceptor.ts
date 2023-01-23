
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // signup and signin apis have different base url
    if (request.url.indexOf('signup') > -1 || request.url.indexOf('verifyPassword') > -1) {
      return next.handle(request);
    }

    return next.handle(
      request.clone({
        url: environment.backend.url + request.url,
      })
    );
  }
}