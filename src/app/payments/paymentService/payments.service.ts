import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  whatIPaidBehaviorSubject = new BehaviorSubject<any>([]);
  myGroupPaidBehaviorSubject = new BehaviorSubject<any>([]);
  myAllGroupPaidBehaviorSubject = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient, private router: Router) { }

  private getPaidPayments = (path) => {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(
      'https://building-committee-backend.herokuapp.com/payments' + path, {headers, responseType: 'text'},
    ).pipe(map((response: any) => {
      // console.log(response);
      return JSON.parse(response);
    }), catchError((err: any) => {
      // console.log(err);
      return throwError(err);
    }));
  }

  myPaidPayments = () => {
    this.getPaidPayments('/userPayments').subscribe(data => {
      if (data.message === 'Successfully worked') {
        const payments = data.payments;
        let elements = [];
        for (let i = 0; i < payments.length; i++) {
          elements.push({id: (i + 1).toString(), amount: payments[i].amount,
            payDate: payments[i].payDate, chargeDate: payments[i].chargeDate, objective: payments[i].objective});
        }
        this.whatIPaidBehaviorSubject.next(elements);
      }
    },
    Error => {
      alert(JSON.parse(Error.error).error);
    });
  }

  myGroupPaidPayments = () => {
    this.getPaidPayments('/groupPayments').subscribe(data => {
      if (data.message === 'Successfully worked') {
        const payments = data.payments;
        let elements = [];
        for (let i = 0; i < payments.length; i++) {
          elements.push({id: (i + 1).toString(), debt: payments[i].debt, objective: payments[i].objective});
        }
        this.myGroupPaidBehaviorSubject.next(elements);
      }
    },
    Error => {
      alert(JSON.parse(Error.error).error);
    });
  }

  myAllGroupCharges = () => {
    this.getPaidPayments('/groupPaymentsInDetails').subscribe(data => {
      if (data.message === 'Successfully worked') {
        const payments = data.payments;
        console.log(payments);
        let elements = [];
        for (let i = 0; i < payments.length; i++) {
          elements.push({id: (i + 1).toString(), userName: payments[i].userName, amount: payments[i].
            amount, payDate: payments[i].payDate, chargeDate: payments[i].chargeDate ,
            objective: payments[i].objective});
        }
        this.myAllGroupPaidBehaviorSubject.next(elements);
      }
    },
    Error => {
      alert(JSON.parse(Error.error).error);
    });
  }
}
