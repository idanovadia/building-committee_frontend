import { PaymentsService } from './../paymentService/payments.service';
import { ChargesService } from './../../charges/chargesService/charges.service';
import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { fade } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-what-ipaid',
  templateUrl: './what-ipaid.component.html',
  styleUrls: ['./what-ipaid.component.css'],
  animations: [
    fade
  ],
})
export class WhatIPaidComponent implements OnInit,AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'Amount', 'PayDate', 'ChargeDate', 'Objective'];

  constructor(private cdRef: ChangeDetectorRef, private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.myPaidPayments();
  }

  ngAfterViewInit() {
    // this.setTable();
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  myPaidPayments(){
    this.paymentsService.whatIPaidBehaviorSubject.subscribe(data => {
      if(data.length !== 0 ){
        this.elements = data;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }
    },
    Error => {
    });
    this.paymentsService.myPaidPayments();
  }

}
