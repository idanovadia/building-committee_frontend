import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPaymentsPaidChartPaiComponent } from './group-payments-paid-chart-pai.component';

describe('GroupPaymentsPaidChartPaiComponent', () => {
  let component: GroupPaymentsPaidChartPaiComponent;
  let fixture: ComponentFixture<GroupPaymentsPaidChartPaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPaymentsPaidChartPaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPaymentsPaidChartPaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
