import { fade } from './../../animations/fadeAnimation';
import { ChargesService } from './../chargesService/charges.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-my-future-payments',
  templateUrl: './my-future-payments.component.html',
  styleUrls: ['./my-future-payments.component.css'],
  animations: [
    fade
  ],
})
export class MyFuturePaymentsComponent implements OnInit , AfterViewInit{

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'Amount', 'ChargeDate', 'Objective'];

  constructor(private cdRef: ChangeDetectorRef, private chargesService: ChargesService) { }

  ngOnInit(): void {
    this.MyFuturePayments();
  }

  ngAfterViewInit() {
    // this.setTable();
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  MyFuturePayments(){
    this.chargesService.getMyFuturePaymentsBehaviorSubject.subscribe(data => {
      if(data.length !== 0 ){
        this.elements = data;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }
    },
    Error => {
      // this.elements = [];
    });
    this.chargesService.getMyFuturePayments();
  }

}
