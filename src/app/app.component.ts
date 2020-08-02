import { LoginService } from './home/login/service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'building-committee-frontend';
  url = '';
  constructor(private router: Router,private authenticationService: LoginService){
    // this.auth();
  }

  ngOnInit(): void {
    this.url = this.router.url;
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

  // auth(): any{
  //   if (this.authenticationService.currentUserValue !== null) {
  //     const auth = this.authenticationService.authentication();
  //     if (this.authenticationService.currentUserValue && auth) {
  //       console.log(this.authenticationService.currentUserValue);
  //       console.log(`url: ${this.router.url}`);
  //       this.router.navigate(['/charges']);
  //     }
  //   }
  // }
}
