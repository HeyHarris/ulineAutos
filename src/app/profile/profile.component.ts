import {Component, inject, Input} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../user.service";
import {User} from "../user";
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from "../car.service";
import {CarListing} from "../carlisting";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-profile',
  template: `
    <div class="container-fluid profile-big-wrapper d-flex align-items-center">
      <div class="profile-container col-6 ">
        <div class="row">
          <div class="col-sm-6">
            <img id="profile-icon" src="assets/profile.svg">
          </div>
          <div class="col-sm-6">
            <h1>Edit Profile</h1>
          </div>
        </div>
        <div class="row">
        <div class="col-md-5">
          <p>Welcome {{logged_in_user?.firstname}} </p>
          <h5 id="reservations-field">Your Reservations: {{logged_in_user?.reservations}}</h5>
          <button (click)="removeFirstReservation()" [disabled]="isLoggedIn() === false" type="button" class="btn btn-primary profile-button">Remove First Test Drive</button>
        </div>

        <div class="col-md-7">
    <!--      <mat-form-field id="username-field">-->
    <!--        <mat-label>Username</mat-label>-->
    <!--        <input matInput>-->
    <!--      </mat-form-field>-->
          <h2 id="username-field">Full Name: {{logged_in_user?.firstname}} {{logged_in_user?.lastname}}</h2>

          <h3 id="email-field">Email: {{logged_in_user?.email}}</h3>

    <!--      <mat-form-field id="password-field">-->
    <!--        <mat-label>Enter your password</mat-label>-->
    <!--        <input matInput [type]="hide ? 'password' : 'text'">-->
    <!--        <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">-->
    <!--          <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>-->
    <!--        </button>-->
    <!--      </mat-form-field>-->
          <h2 id="password-field">Password: {{logged_in_user?.password}}</h2>

    <!--      <mat-form-field>-->
    <!--        <mat-label>Username</mat-label>-->
    <!--        <input matInput>-->
    <!--      </mat-form-field>-->
          <h2 id="phone-field">Phone Number: {{logged_in_user?.phonenumber}}</h2>
<!--          <a [routerLink]="['signup']">Signup Page</a>-->
        </div>
        </div>
    </div>
    </div>
  `,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
hide = true;
currentLesson ='3';
// private cookieService = inject(CookieService);
private login_cookie = "null";
logged_in_user: User | undefined;
removedCarListing : CarListing | undefined;
// userxService: UserService = inject(UserService); changed to same service as remove First reservation
  removedCarReservation:number | undefined;


  constructor(private cookieService: CookieService, private _route:Router,  private http: HttpClient, private carService: CarService, private userService: UserService, private router: Router) {
    this.login_cookie = this.cookieService.get("login_id");
    if(!this.isLoggedIn()) {
      alert("Please Login to access this Page")
      this._route.navigate(['login']);
    }
    // console.log(this.login_cookie + "test1")
    this.userService.getUserById(this.login_cookie).then((logged_in_user) => {
      this.logged_in_user = logged_in_user;
    })
  }

isLoggedIn(): boolean{ //returns true or false if the cookie "login_id" is set
    return this.cookieService.check("login_id");
}
  // getCarListingById and editUserReservations are both asynchronous functions however getCarListingbyId has an asynchronous operation "await fetch("http://localhost:3000/cars/" + id);" so the
  // program conintues to execute and moves on adn returns once it has received the carlisting. SO to fix I can put the editUSer reservation into th getCarlistingById callback to ensure it only
  // runs after the function is finished.
removeFirstReservation() {
  if(this.logged_in_user === undefined || this.logged_in_user?.reservations.length < 1){
    alert("You have no active reservations!");
  } else {
    this.removedCarReservation= this.logged_in_user?.reservations.shift();

    // console.log(this.removedCarReservation);
    this.carService.getCarListingById(this.removedCarReservation ?? -1).then((removedCarListing) => {
      this.removedCarListing = removedCarListing;
      // console.log(this.removedCarListing);

      this.userService.editUserReservations(this.logged_in_user, this.logged_in_user?.id).subscribe(() => {
        // console.log(this.removedCarReservation)
        if(this.removedCarReservation !== -1){
          alert("Successfully removed the test drive for the " + this.removedCarListing?.year + " " + this.removedCarListing?.make + " " + this.removedCarListing?.model);
        } else {
          alert("You have no active reservations");
        }

        this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/profile']);
        });
      });
    })

  }
  // console.log(this.logged_in_user);

}


getLoginIdCookie() {
  return this.login_cookie;
}
}
