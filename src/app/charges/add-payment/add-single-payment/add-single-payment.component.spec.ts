import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSinglePaymentComponent } from './add-single-payment.component';

describe('AddSinglePaymentComponent', () => {
  let component: AddSinglePaymentComponent;
  let fixture: ComponentFixture<AddSinglePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSinglePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSinglePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
