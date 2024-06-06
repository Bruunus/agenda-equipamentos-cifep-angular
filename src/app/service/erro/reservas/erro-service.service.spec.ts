import { TestBed } from '@angular/core/testing';

import { ErroServiceService } from './erro-service.service';

describe('ErroServiceService', () => {
  let service: ErroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
