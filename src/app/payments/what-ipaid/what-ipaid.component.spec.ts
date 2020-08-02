import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIPaidComponent } from './what-ipaid.component';

describe('WhatIPaidComponent', () => {
  let component: WhatIPaidComponent;
  let fixture: ComponentFixture<WhatIPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatIPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatIPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
