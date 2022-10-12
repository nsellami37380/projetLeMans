import { TestBed } from '@angular/core/testing';

import { LeMan24Service } from './le-man24.service';

describe('LeMan24Service', () => {
  let service: LeMan24Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeMan24Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
