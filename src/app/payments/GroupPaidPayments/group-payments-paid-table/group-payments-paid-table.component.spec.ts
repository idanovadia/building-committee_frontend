import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPaymentsPaidTableComponent } from './group-payments-paid-table.component';

describe('GroupPaymentsPaidTableComponent', () => {
  let component: GroupPaymentsPaidTableComponent;
  let fixture: ComponentFixture<GroupPaymentsPaidTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPaymentsPaidTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPaymentsPaidTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
