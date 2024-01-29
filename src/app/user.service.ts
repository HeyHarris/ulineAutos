import { Injectable } from '@angular/core';
// import {CarListing} from "./carlisting";
import {User} from "./user";
import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

// import {}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  url = 'http://localhost:3000/users'
  constructor(private _http: HttpClient) { }

  async getUserById(id: string): Promise<User | undefined> {
    const data = await fetch("http://localhost:3000/users/" + id);
    return await data.json() ?? {};
  }

  editUserReservations(currentUser: User | undefined, id: number | undefined) : Observable<User>{
    return this._http
      .put<User>(
        "http://localhost:3000/users/" + id,
        JSON.stringify(currentUser),
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError)
      )
    console.log(currentUser)
  }


  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
