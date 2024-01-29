import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
// import {ToastrService} from "ngx-toastr";
// import {Validator} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signup:FormGroup|any;
  signuser:any;

  constructor(private _route:Router, private _http:HttpClient) {
  }
  ngOnInit():void{
    this.signup = new FormGroup({
      'firstname': new FormControl(),
      'lastname': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl(),
      'phonenumber': new FormControl(),
      'birthdate': new FormControl(),
      'photo': new FormControl('assets/', { initialValueIsDefault: true}),
      'reservations': new FormControl([], { initialValueIsDefault: true})
    })
  }

  signupCheck(signup:FormGroup){
    // console.log(this.signup.value);
    if(this.signup.value.firstname && this.signup.value.lastname && this.signup.value.email && this.signup.value.password && this.signup.value.phonenumber && this.signup.value.birthdate ){
      this.signuser = this.signup.value.firstname;
      this._http.post<any>("http://localhost:3000/users", this.signup.value)
        .subscribe(res=>{ //find new way instead of .subscribe
          alert(this.signuser + ' Data added successfully')
          // this._toast.success("Congratulations", this.signuser);
          this.signup.reset();
          this._route.navigate(['login'])
        }, err=>{
          alert('Something went Wrong!!!')
        })
    } else {
      alert("Please Fill Out ALL Fields!!!");
    }
  }

}
