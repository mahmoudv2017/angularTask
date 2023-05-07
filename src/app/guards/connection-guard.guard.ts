import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ApiServicesService } from '../services/ApiService/api-services.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionGuardGuard implements CanActivate {
  constructor(private ApiService:ApiServicesService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

     return this.ApiService.testConnection().pipe( map(res => {
        return true
      }))
   // return true;
  }

}
