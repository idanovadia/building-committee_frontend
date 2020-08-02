import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFuturePaymentsComponent } from './my-future-payments.component';

describe('MyFuturePaymentsComponent', () => {
  let component: MyFuturePaymentsComponent;
  let fixture: ComponentFixture<MyFuturePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFuturePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFuturePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
