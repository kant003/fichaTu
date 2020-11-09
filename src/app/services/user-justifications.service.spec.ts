import { TestBed } from '@angular/core/testing';

import { UserJustificationsService } from './user-justifications.service';

describe('UserJustificationsService', () => {
  let service: UserJustificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserJustificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
