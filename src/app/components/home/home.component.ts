import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import {Subscription} from 'rxjs'
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  FirstSubscription: Subscription|any;
  public user:any = {
    firstName:"mahmoud"
  }
  constructor(private router:Router ,  private authService: SocialAuthService){
    const navigation = this.router.getCurrentNavigation()!;
    if (navigation.extras.state) {
      this.user = navigation.extras.state['user'];
    }

  }

 async singout(){
  if(this.user.provider.toLowerCase() == "database"){
    this.router.navigate(["account"])
  }
  try {
    await this.authService.signOut(true)
    this.router.navigate(["account"])
  } catch (error) {
    console.log(error)
  }



  }

}
