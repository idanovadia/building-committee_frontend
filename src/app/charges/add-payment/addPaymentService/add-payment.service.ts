import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPaymentService {
  addSinglePaymentBehaviorSubject = new BehaviorSubject<any>([]);
  addPaymentBehaviorSubject = new BehaviorSubject<any>(false);
  membersSubject = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  getMembersRequest = (path) => {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(
      'https://building-committee-backend.herokuapp.com/' + path, {headers,responseType: 'text'},
    ).pipe(map((response: any) => {
      // console.log(response);
      return JSON.parse(response);
    }), catchError((err: any) => {
      console.log(err);
      return throwError(err);
    }));
  }

  getMembers = () => {
    this.getMembersRequest('appointments/GroupMembers').subscribe(data => {
      if(data.message === 'Successfully worked') {
        const users = data.users;
        console.log(users);
        var elements = [];
        this.membersSubject.next(users);
      }
    },
    Error => {
      console.log(Error.error);
      alert(JSON.parse(Error.error).error);
    });
  }
}
