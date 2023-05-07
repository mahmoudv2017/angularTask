import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OPTServiceService {

  constructor(private http:HttpClient) { }

  RequestOTP(body:{receipient:string , Trans_way:string}){
    return this.http.post(environment.baseApi+"/account/otp/request" , body)
  }

  SendOTP(body:{receipient:string , code:string}){
    return this.http.post(environment.baseApi+"/account/otp/recieve" , body)
  }
}
