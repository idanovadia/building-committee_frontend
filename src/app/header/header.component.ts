import { LoginService } from './../home/login/service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: LoginService) { }

  ngOnInit(): void {
  }

  connected(): any{
    return this.authenticationService.currentUserValue;
  }

  logOut() {
    this.authenticationService.logout();
  }


}
