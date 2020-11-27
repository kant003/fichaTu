import { TestBed } from '@angular/core/testing';

import { CalificationService } from './calification.service';

describe('CalificationService', () => {
  let service: CalificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
