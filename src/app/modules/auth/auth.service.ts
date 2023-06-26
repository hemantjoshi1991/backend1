import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // meassage : string = ""
 private currentUser : BehaviorSubject<any> = new BehaviorSubject<any>(null)
 private isLoggedIn : BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false)

 get currentUser$(){
  return this.currentUser.asObservable()
 }
 get isLoggedIn$(){
  return this.isLoggedIn.asObservable()
 }

  constructor(private router : Router) { }

  authLogin(res : any){
    localStorage.setItem('userDetails', JSON.stringify(res))
    this.router.navigate(['dashboard/default']);
    this.currentUser.next(res)
    this.isLoggedIn.next(true)
  }

  loggOut(){
    this.currentUser.next(null);
    this.isLoggedIn.next(false);
  }
}
