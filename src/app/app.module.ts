import { NgModule, LOCALE_ID } from '@angular/core';
import {BrowserModule, provideProtractorTestingSupport} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DecimalPipe } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import {provideRouter, RouterModule} from "@angular/router";


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarListingComponent} from "./car-listing/car-listing.component";
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import {MatCardModule} from "@angular/material/card";
import { ProfileComponent } from './profile/profile.component';
import {ButtonModule} from "primeng/button";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RippleModule} from "primeng/ripple";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {CookieModule} from "ngx-cookie";
import {MatPaginatorModule} from '@angular/material/paginator';
// import {} from "lodash";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarListingComponent,
    ListingDetailsComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    CardModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    DialogModule,
    ButtonModule,
    DynamicDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    CookieModule,
    MatPaginatorModule
  ],
  exports: [
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [DecimalPipe, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
