import { AddPaymentService } from './../addPaymentService/add-payment.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-single-payment',
  templateUrl: './add-single-payment.component.html',
  styleUrls: ['./add-single-payment.component.css']
})
export class AddSinglePaymentComponent implements OnInit {

  init = true;
  amount = '';
  objective = '';
  selectedMember = '';
  members = [];
  constructor(private addPaymentService: AddPaymentService) { }

  ngOnInit(): void {
    this.addPaymentService.addPaymentBehaviorSubject.subscribe(data => {
      if(data){
          this.addPaymentService.addSinglePaymentBehaviorSubject.next({
            userName: this.selectedMember,
            amount: this.amount,
            chargeDate: new Date(),
            objective: this.objective
          });
        }
    },
    Error => {
    });
    this.addPaymentService.membersSubject.subscribe(data => {
      data.forEach(element => {
        this.members.push(element.userName);
      });
    },
    Error => {
    });
    
  }

  remove(){
    this.init = false;
  }
}
