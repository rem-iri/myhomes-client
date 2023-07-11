import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerLayoutComponent } from './buyer-layout.component';

describe('BuyerLayoutComponent', () => {
  let component: BuyerLayoutComponent;
  let fixture: ComponentFixture<BuyerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerLayoutComponent]
    });
    fixture = TestBed.createComponent(BuyerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
