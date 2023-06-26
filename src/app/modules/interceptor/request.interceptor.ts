import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import {map} from 'rxjs/operators'

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private _authService : AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let request : any;
    let currentUser : any;
    this._authService.isLoggedIn$.pipe(map(isLoggedIn =>{
      if(isLoggedIn){
        this._authService.currentUser$.subscribe(res =>{
          currentUser = res
          request = res.clone({
            setHeaders : {
              'Athorization' : `Bearer ${currentUser.token}`
            }
          })
        })
      }
    }))
    return next.handle(request ? request : req);
  }
}
