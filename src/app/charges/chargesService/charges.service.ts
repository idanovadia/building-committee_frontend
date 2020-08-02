import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChargesService {
  elements: any = [];
  getMyFuturePaymentsBehaviorSubject = new BehaviorSubject<any>([]);
  getMyGroupChargesBehaviorSubject = new BehaviorSubject<any>([]);
  getGroupChargesInDetailsBehaviorSubject = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private router: Router) { }

  private getFuturePayments = (path) => {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(
      'https://building-committee-backend.herokuapp.com/charges' + path, {headers, responseType: 'text'},
    ).pipe(map((response: any) => {
      return JSON.parse(response);
    }), catchError((err: any) => {
      return throwError(err);
    }));
  }

  private chargesPostReq = (path,body) => {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(
      'https://building-committee-backend.herokuapp.com/charges' + path, body, {headers, responseType: 'text'},
    ).pipe(map((response: any) => {
      return JSON.parse(response);
    }), catchError((err: any) => {
      return throwError(err);
    }));
  }

  pay = (charge) => {
    this.chargesPostReq('/pay', charge).subscribe(data => {
      if(data.message === 'Successfully paid'){
        alert(data.message);
      }
    },
    Error => {
      alert('Try Again');
    });
  }

  addNewCharges = (charges) => {
    this.chargesPostReq('/newCharges',charges).subscribe(data => {
      if(data.message === 'Successfully inserted'){
        alert(data.message);
      }
    },
    Error => {
      alert('Try Again');
    });
  }

  getMyFuturePayments = () => {
    this.getFuturePayments('/myCharges').subscribe(data => {
      if(data.message === 'Successfully worked') {
        const listOfCharges = data.listOfCharges;
        var elements = [];
        for (let i = 0; i < listOfCharges.length; i++) {
          elements.push({id: (i + 1).toString(), amount: listOfCharges[i].amount,
             chargeDate: new Date(listOfCharges[i].chargeDate), objective: listOfCharges[i].objective});
        }
        this.getMyFuturePaymentsBehaviorSubject.next(elements);
      }
    },
    Error => {
      alert(JSON.parse(Error.error).error);
    });
  }

  getMyGroupCharges = () => {
    this.getFuturePayments('/myGroupCharges').subscribe(data => {
      if(data.message === 'Successfully worked') {
        const listOfCharges = data.listOfGroupCharges;
        var elements = [];
        for (let i = 0; i < listOfCharges.length; i++) {
          elements.push({id: (i + 1).toString(), debt: listOfCharges[i].debt,
            objective: listOfCharges[i].objective});
        }
        this.getMyGroupChargesBehaviorSubject.next(elements);
      }
    },
    Error => {
      alert(JSON.parse(Error.error).error);
    });
  }

  myAllGroupCharges = () => {
    this.getFuturePayments('/myAllGroupCharges').subscribe(data => {
      if(data.message === 'Successfully worked') {
        const listOfCharges = data.listOfGroupCharges;
        var elements = [];
        for (let i = 0; i < listOfCharges.length; i++) {
          elements.push({id: (i + 1).toString(),userName:listOfCharges[i].userName,chargeID:listOfCharges[i].chargeID,
             amount: listOfCharges[i].amount,chargeDate: new Date(listOfCharges[i].chargeDate), objective: listOfCharges[i].objective});
        }
        this.getGroupChargesInDetailsBehaviorSubject.next(elements);
      }
    },
    Error => {
     
    });
  }
}


