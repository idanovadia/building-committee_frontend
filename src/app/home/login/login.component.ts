import { LoginService } from './service/login.service';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    userName: '',
    password: ''
  };



  constructor(private loginService: LoginService, private http: HttpClient,private router: Router) {}

  ngOnInit(): void {}

  login = () => {
    this.loginService.login(this.user).subscribe(data => {
      alert(data);
      this.router.navigate(['/charges']);
    },
    Error => {
      // if (JSON.parse(Error.error).error === 'Auth failed') {
        alert('Username or Password are not valid');
      // } else {
        // alert('Try Again Later');
      // }
    });
  }
}
