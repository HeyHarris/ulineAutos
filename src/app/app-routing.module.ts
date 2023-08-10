import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
  {
  path: 'profile',
  component: ProfileComponent,
  title: 'Profile Page'
},
  {
  path: 'home',
  component: HomeComponent,
  title: 'Home Page'
},
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup Page'
  },
  { path: 'login',
    redirectTo: '',
    pathMatch: 'full' },
  {
    path: '',
    component: LoginComponent,
    title: 'Login Page'
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
