import { PaymentsService } from './../../paymentService/payments.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { fade } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-group-payments-paid-table',
  templateUrl: './group-payments-paid-table.component.html',
  styleUrls: ['./group-payments-paid-table.component.css'],
  animations: [
    fade
  ],
})
export class GroupPaymentsPaidTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'Debt', 'Objective'];

  constructor(private cdRef: ChangeDetectorRef, private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.GroupCharges();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }


  GroupCharges(){
    this.paymentsService.myGroupPaidBehaviorSubject.subscribe(data => {
      console.log(data);
      if(data.length !== 0 ){
        this.elements = data;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }
    },
    Error => {
      this.elements = [];
    });
    this.paymentsService.myGroupPaidPayments();

  }

}
