import { AuthGuard } from './../auth/auth.guard';
import { ChargesService } from './chargesService/charges.service';
import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { BehaviorSubject } from 'rxjs';
import { fade } from '../animations/fadeAnimation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css'],
  animations: [
    fade
  ],
})
export class ChargesComponent implements OnInit  {

  tableName = 'My Future Payments';
  // tableName = 'My Future Payments';

  constructor(private authGuard: AuthGuard, private router: Router, private cdRef: ChangeDetectorRef, private chargesService: ChargesService) { }

  ngOnInit(): void {
    
  }

  changeTable(name){
    this.tableName = name;
  }

  getRule() {
    if (this.authGuard.getRole() === 'manager'){
      return true;
    } else {
      return false;
    }
  }
}
