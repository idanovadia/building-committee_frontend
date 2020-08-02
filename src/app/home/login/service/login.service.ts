// import { AuthGuard } from './../../../auth/auth.guard';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private options = { headers: new Headers({ 'Content-Type': 'application/json', 
                                              'Accept': 'q=0.8;application/json;q=0.9' }) };


  
  constructor(private http: HttpClient,private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUserBCE')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login = (user) => {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(
      'https://building-committee-backend.herokuapp.com/login', user,  {headers, responseType: 'text'},
    ).pipe(map((response: any) => {
      const resData = JSON.parse(response);
      localStorage.setItem('currentUserBCE', JSON.stringify(resData.token));
      this.currentUserSubject.next(resData.token);
      return resData.message;
    }), catchError((err: any) => {
      return throwError(err);
    }));
  }

  async getAuthentication(){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const ans =  await this.http.get(
      'https://building-committee-backend.herokuapp.com/authentication',{headers}).toPromise()
      .then(result => {
        return {
          role: JSON.parse(JSON.stringify(result)).role,
          permission: true,
        };
      }).catch(e => {
        return {permission: false,
                role: ''} ;
      });
    return ans;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUserBCE');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);

  }

  authentication() {
    return this.getAuthentication();
  }
}