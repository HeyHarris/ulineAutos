import { Component, inject} from '@angular/core';
import {CarListing} from "../carlisting";
import {CarService} from "../car.service";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-home',
  standalone: false,
  template: `
      <app-car-listing *ngFor="let carListing of carListingList"
                       [carListing]="carListing">
      </app-car-listing>

<!--      <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>-->

  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  carListingList: CarListing[] = [];
  carService: CarService = inject(CarService);
  // filteredLocationList: HousingLocation[] = []; //Holds the value that match the search criteria of the user


  constructor() {
    this.carService.getAllCarListings().then((carListingList:CarListing[]) => {
      this.carListingList = carListingList;
      // this.filteredLocationList = housingLocationList;
    })

}
}
