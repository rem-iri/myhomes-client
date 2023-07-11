import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSignupComponent } from './buyer-signup.component';

describe('BuyerSignupComponent', () => {
  let component: BuyerSignupComponent;
  let fixture: ComponentFixture<BuyerSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerSignupComponent]
    });
    fixture = TestBed.createComponent(BuyerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
