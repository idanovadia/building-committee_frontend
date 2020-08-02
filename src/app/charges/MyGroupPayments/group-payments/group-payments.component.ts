import { ChargesService } from './../../chargesService/charges.service';
import { fade } from './../../../animations/fadeAnimation';
import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-group-payments',
  templateUrl: './group-payments.component.html',
  styleUrls: ['./group-payments.component.css'],
  animations: [
    fade
  ],
})
export class GroupPaymentsComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'Debt', 'Objective'];

  constructor(private cdRef: ChangeDetectorRef, private chargesService: ChargesService) { }

  ngOnInit(): void {
    this.GroupCharges();
  }

  ngAfterViewInit() {
    // this.setTable();
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }


  GroupCharges(){
    this.chargesService.getMyGroupChargesBehaviorSubject.subscribe(data => {
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
    this.chargesService.getMyGroupCharges();

  }

}
