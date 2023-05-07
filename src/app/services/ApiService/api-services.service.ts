import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {


  constructor(private http:HttpClient) { }

  testConnection(){
    return this.http.get(environment.baseApi)
  }

  CheckEmail(email:string){
  return  this.http.get<boolean>(  `http://localhost:8000/account/checkEmail/${email}`)
  }
  Signup(body:any){
    return this.http.post(environment.baseApi+"/account/signup" , body)
  }

  RequestOTP(body:{receipient:string , Trans_way:string}){
    return this.http.post(environment.baseApi+"/account/otp/request" , body)
  }

  SendOTP(body:{receipient:string , code:string}){
    return this.http.post(environment.baseApi+"/account/otp/recieve" , body)
  }

  Login(body:{email:string , password:string}){
    return this.http.post(environment.baseApi+"/account/login" , body)
  }
}
