import { Injectable } from '@angular/core';
import {CarListing} from "./carlisting";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url = 'http://localhost:3000/cars'

  constructor() { }

  async getAllCarListings(): Promise<CarListing[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getCarListingById(id: number): Promise<CarListing | undefined> {
    if(id > -1)
    {
      const data = await fetch("http://localhost:3000/cars/" + id);
      return await data.json() ?? {};
    } else {
      const emptyCarListing: CarListing = {
        id: -1,
        make: 'none',
        model: 'none',
        year: -1,
        mileage: -1,
        price: -1,
        photo: 'none',
        drivetrain: 'none',
        mpg: -1,
        seller: 'none',
        vin: 'none'
      };
      return emptyCarListing
    }

  }

}
