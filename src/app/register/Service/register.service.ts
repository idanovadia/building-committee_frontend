import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  register = (form: any) => {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(
      'https://building-committee-backend.herokuapp.com/registration', form,  {headers, responseType: 'text'},
    ).pipe(map((response: any) => {
      // console.log(response);
      return response;
    }), catchError((err: any) => {
      // console.log(err);
      return throwError(err);
    }));
  }
}


