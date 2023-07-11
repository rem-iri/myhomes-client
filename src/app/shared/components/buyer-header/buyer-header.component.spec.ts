import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerHeaderComponent } from './buyer-header.component';

describe('BuyerHeaderComponent', () => {
  let component: BuyerHeaderComponent;
  let fixture: ComponentFixture<BuyerHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerHeaderComponent]
    });
    fixture = TestBed.createComponent(BuyerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
