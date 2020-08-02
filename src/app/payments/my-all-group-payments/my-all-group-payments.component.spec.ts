import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAllGroupPaymentsComponent } from './my-all-group-payments.component';

describe('MyAllGroupPaymentsComponent', () => {
  let component: MyAllGroupPaymentsComponent;
  let fixture: ComponentFixture<MyAllGroupPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAllGroupPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAllGroupPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
