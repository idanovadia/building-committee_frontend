import { AuthGuard } from './../auth/auth.guard';
import { UserService } from './userService/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user = new User('', '', '', '', '', '', '', '', '', '', '');
  constructor(private authGuard: AuthGuard, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    this.userService.getUserDetailsBehaviorSubject.subscribe(data => {
      if (data.length !== 0 ){
        this.user = new User(
          data.userName,
          data.firstName,
          data.lastName,
          data.city,
          data.street,
          data.buildingNumber,
          data.apartmentNumber,
          data.phone,
          data.role,
          data.groupNumber,
          data.code,
        );
      }
    },
    Error => {
    });
    this.userService.getUserDetails();
  }

  getRule() {
    if (this.authGuard.getRole() === 'manager'){
      return true;
    } else {
      return false;
    }
  }


}
