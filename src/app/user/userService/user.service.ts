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
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(
      'https://building-committee-backend.herokuapp.com/user' + path, {headers, responseType: 'text'},
    ).pipe(map((response: any) => {
      return JSON.parse(response);
    }), catchError((err: any) => {
      return throwError(err);
    }));
  }


  getUserDetails = () => {
    this.userHttpReq('/getUserDetails').subscribe(data => {
      if(data.message === 'Successfully worked') {
        const myUser = data.myUser;
        this.getUserDetailsBehaviorSubject.next(myUser);
      }
    },
    Error => {
      alert(JSON.parse(Error.error).error);
    });
  }
}
