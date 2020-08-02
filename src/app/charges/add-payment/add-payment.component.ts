import { ChargesService } from './../chargesService/charges.service';
import { AddPaymentService } from './addPaymentService/add-payment.service';
import { AddSinglePaymentComponent } from './add-single-payment/add-single-payment.component';
import { Component, OnInit, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, AfterViewChecked } from '@angular/core';
import { fade } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css'],
  animations: [
    fade
  ],
})
export class AddPaymentComponent implements OnInit{
  @ViewChild('appenHere', {static : false, read : ViewContainerRef}) target: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  paymentsArray = [];
  constructor(private resolver: ComponentFactoryResolver, private addPaymentService: AddPaymentService,
    private chargesService: ChargesService) {
    // this.addNewComponent();
   }

  ngOnInit(): void {
    this.addPaymentService.addSinglePaymentBehaviorSubject.subscribe(data => {
      console.log(data);
      if(data.length !== 0){
        this.paymentsArray.push(data);
      }
    },
    Error => {
      // this.elements = [];
    });
    this.addPaymentService.getMembers();
  }


  addNewComponent() {
    let childComponent = this.resolver.resolveComponentFactory(AddSinglePaymentComponent);
    this.componentRef = this.target.createComponent(childComponent);
  }

  send() {
    const listOfCharges = {
      listOfCharges: this.paymentsArray
    };
    console.log(listOfCharges);
    this.addPaymentService.addPaymentBehaviorSubject.next(true);
    this.paymentsArray = [];
    this.chargesService.addNewCharges(listOfCharges);
    // const nodes = document.querySelectorAll('#form')
    // Array.from(nodes).forEach(node => {
    //   console.log(node);
    // })
  }

  add() {

  }

}
