import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'
import {BreakpointObserver} from '@angular/cdk/layout'
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ulineAuto';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  constructor(private observer: BreakpointObserver, private cookieService:CookieService){

  }
  // ngAfterViewInit() {
  //   this.observer.observe(['max-width: 0px']).subscribe((res) => {
  //     if(!res.matches) {
  //       this.sidenav.mode = 'over';
  //       this.sidenav.close()
  //     } else {
  //       this.sidenav.mode = "side";
  //       this.sidenav.open();
  //     }
  //   });
  // }
  // faCoffee = faCoffee;
}
