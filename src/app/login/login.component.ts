import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {FormGroup} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
login: FormGroup|any;
private cookie_name='default';
private all_cookies:any='';
  constructor(private _http:HttpClient, private _route:Router, private cookieService:CookieService) {
    this.deleteCookie()

  }

  setCookie(id: number) {
    this.cookieService.set('login_id', id.toString())
  }
  deleteCookie(){
    this.cookieService.delete('login_id');
  }

  deleteAll(){
    this.cookieService.deleteAll();
  }
  ngOnInit(): void {
    // this.cookie_name=this.cookieService.get('login_id');
    // this.all_cookies=this.cookieService.getAll();  // get all cookies object
    this.login = new FormGroup({
      'femail': new FormControl(),
      'fpassword': new FormControl()
    })


  }
    loginCheck(login:FormGroup){
      // console.log(this.login.value);
      this._http.get<any>("http://localhost:3000/users")
        .subscribe(res=>{ //deprecated way try to change after reservation system
          const user = res.find((a:any)=> {
            return a.email === this.login.value.femail && a.password === this.login.value.fpassword;
          });
          if(user){
            this.setCookie(user["id"]);
            alert(user["firstname"] + " You have Successfully Logged in!");
            this.login.reset();
            this._route.navigate(['home']);
          } else{
            alert('User Not Found! Try Again.')
            this._route.navigate(['login']);
          }
        }, err => {
          alert("Something Went Wrong during Login!!!");
        })
  }

}
