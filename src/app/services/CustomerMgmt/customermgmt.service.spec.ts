import { TestBed } from '@angular/core/testing';

import { CustomermgmtService } from './customermgmt.service';

describe('CustomermgmtService', () => {
  let service: CustomermgmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomermgmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
