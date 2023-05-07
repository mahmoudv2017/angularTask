import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from './services/ApiService/api-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  constructor(private ApiService:ApiServicesService){}
  title = 'client';
  enabled:boolean = false
  ngOnInit(): void {
    this.ApiService.testConnection().subscribe({
      next : () => {
        console.log("connected")
        this.enabled = true
      },
      error: (err) => {
        console.log(err)
        console.log("somthinf")
        this.enabled = false
      },
    })
  }



}
