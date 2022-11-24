import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    const tokenId = localStorage.getItem("tokenId");
    console.log(tokenId);
    

    if(tokenId) {

      const cloned = request.clone({
        headers: request.headers.set(
          "Authorization", 
          "Bearer " + tokenId
        )
      });

      console.log(cloned);
      

      return next.handle(cloned)
      .pipe(
        catchError((err: HttpErrorResponse) => {          
          if(err.status === 401) {
            // UNAUTHORIZED
            if(err.error.is_token_expired) {
              return throwError(() => new Error("Token expiré"));
            } else {
              return throwError(() => new Error("Token présent mais il manque des informations d'authentification"));
            }
          }
          if(err.status === 403) {
            // FORBIDDEN
            return throwError(() => new Error("Token présent + authentifié MAIS non autorisé à consulter la ressource " + err.error.error_messag));
          }
          return throwError(() => new Error("Token présent mais problème"))
        })
      )

    } else {
      return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error("Pas de token fourni"))
        })
      )
    }
  }
}
