import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateNewsComponent } from './real-estate-news.component';

describe('RealEstateNewsComponent', () => {
  let component: RealEstateNewsComponent;
  let fixture: ComponentFixture<RealEstateNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealEstateNewsComponent]
    });
    fixture = TestBed.createComponent(RealEstateNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
