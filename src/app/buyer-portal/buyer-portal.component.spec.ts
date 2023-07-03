import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPortalComponent } from './buyer-portal.component';

describe('BuyerPortalComponent', () => {
  let component: BuyerPortalComponent;
  let fixture: ComponentFixture<BuyerPortalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerPortalComponent]
    });
    fixture = TestBed.createComponent(BuyerPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
