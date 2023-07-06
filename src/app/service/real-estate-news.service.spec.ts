import { TestBed } from '@angular/core/testing';

import { RealEstateNewsService } from './real-estate-news.service';

describe('RealEstateNewsService', () => {
  let service: RealEstateNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealEstateNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
