import { AbstractControl, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { ApiServicesService } from "src/app/services/ApiService/api-services.service";





export class CustomValidators{


  static passwordMatchValidator(Apiservice:ApiServicesService){
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')!;
      const confirmPassword = control.get('confirmPassword')!;

      if (password.value !== confirmPassword.value) {
        return { passwordMatch: true };
      }
      return null;
    }
  }

  static Email_validator (ApiService:ApiServicesService){
    return (c:AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

      return ApiService.CheckEmail(c.value).pipe(
        map((result: boolean ) => {
          return !result ? null : { 'myAsyncValidator': true };
        })
      )
    };
  }
}

