import { TestBed } from '@angular/core/testing';

import { AddPaymentService } from './add-payment.service';

describe('AddPaymentService', () => {
  let service: AddPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
