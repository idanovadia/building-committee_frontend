import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAllGroupChargesComponent } from './my-all-group-charges.component';

describe('MyAllGroupChargesComponent', () => {
  let component: MyAllGroupChargesComponent;
  let fixture: ComponentFixture<MyAllGroupChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAllGroupChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAllGroupChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
