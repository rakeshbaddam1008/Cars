import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpErrorResponse,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
  
  import { BehaviorSubject, Observable, throwError } from 'rxjs';
  import { catchError, filter, switchMap, take } from 'rxjs/operators';
  import { TokenStorageService } from '../services/TokenStorageService';
  import { AuthService } from '../services/AuthService';
  
  const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end
  //const TOKEN_HEADER_KEY = 'x-access-token'; // for Node.js Express back-end
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
      null
    );
  
    constructor(
      private tokenService: TokenStorageService,
      private authService: AuthService
    ) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<Object>> {
      let authReq = req;
      const token = this.tokenService.getToken();
      if (token != null) {
        authReq = this.addTokenHeader(req, token);
      }
  
      return next.handle(authReq).pipe(
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            !authReq.url.includes('auth/signin') &&
            error.status === 401
          ) {
            return this.handle401Error(authReq, next);
          }
  
          return throwError(error);
        })
      );
    }
  
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
  
        const token = this.tokenService.getRefreshToken();
  
        if (token)
          return this.authService.refreshToken(token).pipe(
            switchMap((token: any) => {
              this.isRefreshing = false;
  
              this.tokenService.saveToken(token.accessToken);
              this.refreshTokenSubject.next(token.accessToken);
  
              return next.handle(this.addTokenHeader(request, token.accessToken));
            }),
            catchError((err) => {
              this.isRefreshing = false;
  
              this.tokenService.signOut();
              return throwError(err);
            })
          );
      }
  
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addTokenHeader(request, token)))
      );
    }
  
    private isValidRequestForInterceptor(requestUrl: string): boolean {
      let urlsToInclude = [
        'seller-vehicle-info',
        '/profile-info',
        'update-profile-info',
        '/carizma/acceptance-status',
        '/seller-vehicle-complete-info',
      ];
      if (urlsToInclude.some((s) => requestUrl.endsWith(s))) return true;
  
      return false;
    }
  
    private addTokenHeader(request: HttpRequest<any>, token: string) {
      /* for Spring Boot back-end */
      return request.clone({
        headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }
  }
  
  export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ];
  