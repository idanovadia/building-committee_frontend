import { AuthGuard } from './../auth/auth.guard';
import { ChargesService } from './../charges/chargesService/charges.service';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { fade } from '../animations/fadeAnimation';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  animations: [
    fade
  ],
})
export class PaymentsComponent implements OnInit {

  tableName = 'My Paid Payments';
  // tableName = 'My Future Payments';

  constructor(private authGuard:AuthGuard, private router: Router, private cdRef: ChangeDetectorRef, private chargesService: ChargesService) { }

  ngOnInit(): void {
    console.log(`url: ${this.router.url}`);
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
