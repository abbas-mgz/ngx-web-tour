import { TestBed } from '@angular/core/testing';

import { NgxWebTourService } from './ngx-web-tour.service';

describe('NgxWebTourService', () => {
  let service: NgxWebTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxWebTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
