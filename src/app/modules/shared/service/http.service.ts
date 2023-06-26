import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  token : any;

  constructor(private _http : HttpClient) { }

  get(url : string):Observable<any>{
  return this._http.get(url);
  }

  post(url :string, model:any):Observable<any>{
    const body = JSON.stringify(model);
    let httpHeaders = new HttpHeaders()
    .set('Content-Type','application/json')
    
    // const httpHeaders = {Authorization : `Bearer ${this.token}`}
    return this._http.post(url, body , {headers : httpHeaders})
  }

  postImage(url : string, model :any):Observable<any>{
   
    return this._http.post(url,model)
  }
 


  put(url :string,key :number, model:any):Observable<any>{
    const body = JSON.stringify(model);
    const httpHeaders = {Authorization : `Bearer ${this.token}`}
    return this._http.put(url+key,body, {headers : httpHeaders})
  }

  delete(url:string,key :any):Observable<any>{
    const httpHeaders ={Authorisation : `Bearer ${this.token}`};
    return this._http.delete(url+key)
  }

}
