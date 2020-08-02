import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPaymentsPaiChartComponent } from './group-payments-pai-chart.component';

describe('GroupPaymentsPaiChartComponent', () => {
  let component: GroupPaymentsPaiChartComponent;
  let fixture: ComponentFixture<GroupPaymentsPaiChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPaymentsPaiChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPaymentsPaiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
