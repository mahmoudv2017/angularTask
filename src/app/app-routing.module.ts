import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './components/grid/grid.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ConnectionGuardGuard } from './guards/connection-guard.guard';


const routes: Routes = [{path:"account" , component:SignUpComponent , canActivate:[ConnectionGuardGuard]}
,
{path:"grid" , component:GridComponent , canActivate:[ConnectionGuardGuard]},
{path:"home" , component:HomeComponent,canActivate:[ConnectionGuardGuard]},
{path:"login" , component:SignInComponent,canActivate:[ConnectionGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
