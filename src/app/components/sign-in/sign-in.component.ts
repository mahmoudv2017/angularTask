import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider , FacebookLoginProvider  } from "@abacritt/angularx-social-login";
import { ApiServicesService } from 'src/app/services/ApiService/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  myFormGroup: FormGroup;

constructor(   private fb: FormBuilder , private authService: SocialAuthService , private ApiService:ApiServicesService , private router:Router){
  this.myFormGroup = this.fb.group({
    email: new FormControl("" , [Validators.required , Validators.email]),
    password : new FormControl("" , [Validators.required])
  })
}
status:string=""
get Email (){
  return this.myFormGroup.get("email")
}

get Password() {
  return this.myFormGroup.get("password")
}

signInWithFB(): void {
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
}

logMeIn(){
  const form = this.myFormGroup.value
  this.ApiService.Login({
    email:form.email,
    password:form.password
  }).subscribe({
    next:(res:any) => {
      res.user.provider = "Database"
      this.router.navigate(['home'],{ state: { user:res.user } });
    },
    error: () => {
      this.status = "Wrong Username or Password"
    }
  })
}
}
