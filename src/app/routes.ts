import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { CarListingComponent} from './car-listing/car-listing.component';
import {ListingDetailsComponent} from "./listing-details/listing-details.component";
import {ProfileComponent} from "./profile/profile.component";

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile Page'
  }
  // {
  //   path: 'listing-details/:id',
  //   component: ListingDetailsComponent,
  //   title: 'Car-listing Details'
  // }

];

export default routeConfig;
