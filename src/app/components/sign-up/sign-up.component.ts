import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider , FacebookLoginProvider  } from "@abacritt/angularx-social-login";
import {FormControl , FormBuilder , Validators, FormGroup , AbstractControl, ValidationErrors} from '@angular/forms'
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { ApiServicesService } from 'src/app/services/ApiService/api-services.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { CustomValidators } from './Vaidator/PasswordValidator';

const elevenDigitsPattern = /^[0-9]{10}$/;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  title = 'client';
  user:SocialUser|undefined;
  myFormGroup: FormGroup;
  hide:boolean = true
  hide2:boolean = true
  countries = [
    { code: 'EG', name: 'Egypt', dialCode: '+20' },
    { code: 'US', name: 'US', dialCode: '+1' }
  ];
  constructor(public dialog: MatDialog , private router: Router , private authService: SocialAuthService , private fb: FormBuilder , private ApiService: ApiServicesService ) {

   this.myFormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required , Validators.pattern(elevenDigitsPattern)] ],
    verfication_method : ['' , Validators.required],
    area_code : ['' , Validators.required],
    agreed:[null , Validators.requiredTrue],
    email: new FormControl(``, [Validators.required, Validators.email  ],CustomValidators.Email_validator(this.ApiService) ),
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required , ]
   },{
    validators: CustomValidators.passwordMatchValidator(this.ApiService)

   })

  }
  get FirstName(){
    return this.myFormGroup.get("firstName")
  }

  get Email(){
    return this.myFormGroup.get("email")
  }
  get Phone(){
    return this.myFormGroup.get("phone")
  }

  get Area_code(){
    return this.myFormGroup.get("area_code")
  }


  get LastName(){
    return this.myFormGroup.get("lastName")
  }

  get Password(){
    return this.myFormGroup.get("password")
  }

  get ConfirmPassword(){
    return this.myFormGroup.get("confirmPassword")
  }



  ngOnInit(): void {
    this.authService.authState.subscribe((user:SocialUser) => {

      if(user == null){
        return
      }

      console.log(user)
      if(user.provider == "FACEBOOK"){
        user.photoUrl = user.response.picture.data.url
      }
      this.user = user;
      this.router.navigate(['home'],{ state: { user:this.user } });

    })
  }


  openDialog(): void {

    console.log(this.myFormGroup.value)
    const form = this.myFormGroup.value
    var recepient=""
    if(form.verfication_method == "sms"){
       recepient = form.area_code + form.phone
    }else{
      recepient = form.email
    }


    this.ApiService.RequestOTP({
      receipient:recepient,
      Trans_way:form.verfication_method
    }).subscribe({
      next:(res) => console.log(res)
    })

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {recepient, method:form.verfication_method},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!="approved"){
        return
      }
      this.ApiService.Signup(form).subscribe(
        {
          next:(_) => {
            form.provider="Database"
            this.router.navigate(['home'],{ state: { user:form } });
          }
        }
      )

    //  console.log('The dialog was closed');
  //    this.animal = result;
    });
  }




  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }





  }






// export class CustomValidator{

// }
