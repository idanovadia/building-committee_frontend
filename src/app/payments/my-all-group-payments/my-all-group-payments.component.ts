import { PaymentsService } from './../paymentService/payments.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { fade } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-my-all-group-payments',
  templateUrl: './my-all-group-payments.component.html',
  styleUrls: ['./my-all-group-payments.component.css'],
  animations: [
    fade
  ],
})
export class MyAllGroupPaymentsComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'Username', 'Amount', 'Pay Date', 'Charge Date', 'Objective'];

  constructor(private cdRef: ChangeDetectorRef, private paymentsService: PaymentsService) { }

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
    this.paymentsService.myAllGroupPaidBehaviorSubject.subscribe(data => {
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
    this.paymentsService.myAllGroupCharges();
  }

}
