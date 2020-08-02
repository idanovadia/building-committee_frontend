import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUserDetailsBehaviorSubject = new BehaviorSubject<any>([]);


  constructor(private http: HttpClient, private router: Router) { }

  userHttpReq = (path) => {
    console.log("http--");
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(
      'https://building-committee-backend.herokuapp.com/user' + path, {headers, responseType: 'text'},
    ).pipe(map((response: any) => {
      // console.log(response);
      return JSON.parse(response);
    }), catchError((err: any) => {
      // console.log(err);
      return throwError(err);
    }));
  }


  getUserDetails = () => {
    this.userHttpReq('/getUserDetails').subscribe(data => {
      console.log("getUserDetails");
      if(data.message === 'Successfully worked') {
        const myUser = data.myUser;
        console.log(myUser);
        this.getUserDetailsBehaviorSubject.next(myUser);
      }
    },
    Error => {
      alert(JSON.parse(Error.error).error);
    });
  }
}
