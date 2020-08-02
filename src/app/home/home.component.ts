import { LoginService } from './login/service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fade } from '../animations/fadeAnimation';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import AOS from 'aos';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade,
    trigger('Fading', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', animate('5000ms ease-out')),
      transition(':leave', animate('5000ms ease-in')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  bookmark = [
    'bookmark_border',
    'bookmark_border',
    'bookmark_border',
    'bookmark_border'
  ];
  section3_image_bookmark = 'assets/images/section3/myPayment.png';
  src_bookmark = [
    'assets/images/section3/myPayment.png',
    'assets/images/section3/historyOfPayments.png',
    'assets/images/section3/pay.png',
    'assets/images/section3/meeting.png'
  ];
  constructor(private router: Router, private authenticationService: LoginService) {
    if(this.authenticationService.currentUserValue != null){
      this.router.navigate(['/charges']);
    }
   }

  ngOnInit(): void {
    
    setTimeout(() => {
      AOS.init({
        // delay: 700,
        duration: 2000,
      });
    }, 120);
  }

  bookmarkIn(index){
    this.bookmark[index] = 'bookmark';
    this.section3_image_bookmark = this.src_bookmark[index];
  }
  bookmarkOut(index){
    this.bookmark[index] = 'bookmark_border';
  }
}
