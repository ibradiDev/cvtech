import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { map, Observable, tap, shareReplay, catchError } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('Interceptor executed');

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // console.log('Interceptor Success Response:', event);
        }
      })
    );
  }
}
