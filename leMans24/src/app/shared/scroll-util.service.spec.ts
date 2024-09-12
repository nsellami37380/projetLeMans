import { TestBed } from '@angular/core/testing';

import { ScrollUtilService } from './scroll-util.service';

describe('ScrollUtilService', () => {
  let service: ScrollUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
