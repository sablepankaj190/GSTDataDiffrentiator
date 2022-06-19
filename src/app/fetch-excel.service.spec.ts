import { TestBed } from '@angular/core/testing';

import { FetchExcelService } from './fetch-excel.service';

describe('FetchExcelService', () => {
  let service: FetchExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
