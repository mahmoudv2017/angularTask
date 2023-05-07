import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServicesService } from 'src/app/services/ApiService/api-services.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {

  constructor(
    private ApiService:ApiServicesService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
status:string=""
disabledFlag = false;
disabledTimer = 10000
  Rescend(){

    if(this.disabledFlag){
      this.status = "ارجوك انتظر لحظة قبل الارسال"
      return
    }
    this.ApiService.RequestOTP({
      receipient:this.data.recepient,
      Trans_way:this.data.method
    }).subscribe({
      next:(res) => {
        this.status = "تم ارسال الرمز"
        this.cooler()
      },
      error:(err) => {
        this.cooler()
      }
    })
  }

  VerifyToken(){
    console.log(this.data)

    if(this.disabledFlag){
      this.status = "ارجوك انتظر لحظة قبل الارسال"
      return
    }
    this.ApiService.SendOTP({
      receipient:this.data.recepient,
      code:this.data.animal.trim()
    }).subscribe({
      next:(res:any) => {
        if(res.status == "approved"){
          this.dialogRef.close("approved");
          return
        }else{
          this.cooler()
        }

      } ,
      error : () => {
        this.status = "Invalid Code"
        this.cooler()
      },

    })


  }

  cooler(){
    this.disabledFlag = true
    console.log("the flag has started")

    setTimeout(() => {
      console.log("the flag is disabvled")
      this.status = "Ready"
      this.disabledFlag = false

    }, this.disabledTimer);
  }
  onNoClick(): void {
    this.dialogRef.close("canceled");
  }
}
