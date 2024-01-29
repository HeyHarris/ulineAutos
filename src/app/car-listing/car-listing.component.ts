import {Component, Inject, inject, Input, LOCALE_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CarListing } from "../carlisting";
import {UserService} from "../user.service";
import {User} from "../user";
import {formatNumber} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-car-listing',
  template: `

      <div class="row listing">
<!--&lt;!&ndash;        hello&ndash;&gt;-->
<!--        <img class="listing-photo" [src]="carListing.photo" alt="Exterior photo of {{carListing.photo}}" width="400" height="300">-->
        <div class="col-xxl-6 col-xl-6 col-lg-7 col-md-12  d-flex align-items-center">
            <img class="listing-photo" [src]="carListing.photo" alt="Exterior photo of {{carListing.year}} {{carListing.make}} {{carListing.model}}">
        </div>
<!--        <div class="col-lg-1 "></div>-->
        <div class="col-xxl-6 col-xl-6 col-lg-5 col-md-12 car-info-wrapper">
          <div class="car-info">
          <h2 class="listing-title">{{carListing.year}} {{carListing.make}} {{carListing.model}}</h2>
          <!--        <h2 class="listing-title">2013 Nissan Altima</h2>-->
          <h3 class="listing-mileage">{{carListing.mileage | number:'1.0-1'}} mi.</h3>
          <h1 class="listing-price">&dollar;{{carListing.price | number:'1.0-1'}}</h1>
<!--            <h3>{{user.phonenumber}}</h3>-->
<!--          <button class="test-drive-button" [routerLink]="['/listing-details', carListing.id]">Schedule Test Drive</button>-->

          <p-button id="test-drive-button" (click)="showDialog()" styleClass="p-button-raised" label="See More Info"></p-button>
            <p-dialog [(visible)]="visible" [modal]="true" [style]="{ width: '50vw' }" [draggable]="false" [resizable]="false">
              <ng-template pTemplate="header">
                <h1>{{carListing.year}} {{carListing.make}} {{carListing.model}} - {{carListing.id}}</h1>
<!--                <h4>VIN Number: {{carListing.vin}}</h4>-->
              </ng-template>
              <ng-template pTemplate="body">
                <h6><h4>VIN Number: {{carListing.vin}}</h4></h6>
              <h2>Price: &dollar;{{carListing.price | number:'1.0-1'}}</h2>
              <h3>Mileage: {{carListing.mileage | number:'1.0-1'}} mi.</h3>
                <h3>Drivetrain: {{carListing.drivetrain}}</h3>
                <h3>MPG: {{carListing.mpg}} mpg</h3>
                <h2>Seller: {{carListing.seller}}</h2>
                <p-button id="test-drive-button" (click)="addReservation()" [disabled]="isLoggedIn() === false"  styleClass="p-button-raised p-button-warning" label="Schedule Test Drive"></p-button>
              </ng-template>
            </p-dialog>
            <br>
          </div>
        </div>
      </div>

<!--ford f150-->
  `,
  styleUrls: ['./car-listing.component.scss']
})
export class CarListingComponent {
  @Input() carListing!: CarListing;
  // @Input() user!: User;
  visible: boolean = false;
  // userList: User;
  // userService: UserService = inject(UserService);
  // id = 100;
  private login_cookie = "null";
  logged_in_user: User | undefined;

  isLoggedIn(): boolean{ //returns true or false if the cookie "login_id" is set
    return this.cookieService.check("login_id");
  }

  showDialog() {
    this.visible = true;
  }
  addReservation() {
    this.logged_in_user?.reservations.push(this.carListing.id);
   // console.log(this.logged_in_user);
    this.userService.editUserReservations(this.logged_in_user, this.logged_in_user?.id).subscribe(() => {
      this.visible = false;
      alert("Successfully added the " + this.carListing?.year + " " + this.carListing?.make + " " + this.carListing?.model);
      this.router.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home']);
      });
    });
  }

  constructor(private cookieService: CookieService, private http: HttpClient, private userService: UserService, private router: Router) {
    this.login_cookie = this.cookieService.get("login_id");
    // console.log(this.login_cookie + "test1")
    this.userService.getUserById(this.login_cookie).then((logged_in_user) => {
      this.logged_in_user = logged_in_user;
    })
  }

}
