import { ChargesService } from './../chargesService/charges.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { fade } from 'src/app/animations/fadeAnimation';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { element } from 'protractor';

@Component({
  selector: 'app-my-all-group-charges',
  templateUrl: './my-all-group-charges.component.html',
  styleUrls: ['./my-all-group-charges.component.css'],
  animations: [
    fade
  ],
})
export class MyAllGroupChargesComponent implements OnInit,AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'Username', 'Amount', 'ChargeDate', 'Objective', 'Pay'];

  constructor(private cdRef: ChangeDetectorRef, private chargesService: ChargesService) { }

  ngOnInit(): void {
    this.myFuturePaymentsInDetails();
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  myFuturePaymentsInDetails() {
    this.chargesService.getGroupChargesInDetailsBehaviorSubject.subscribe(data => {
      console.log(data);
      if(data.length !== 0 ){
        this.elements = data;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }
    },
    Error => {
    });
    this.chargesService.myAllGroupCharges();
  }

  async pay(index) {
    const charge = {
      chargeID: this.elements[index].chargeID
    };
    console.log(charge);
    await this.chargesService.pay(charge);
    this.elements.splice(index, index + 1);
  }


}
