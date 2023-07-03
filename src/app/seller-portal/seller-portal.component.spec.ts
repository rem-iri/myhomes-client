import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPortalComponent } from './seller-portal.component';

describe('SellerPortalComponent', () => {
  let component: SellerPortalComponent;
  let fixture: ComponentFixture<SellerPortalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerPortalComponent]
    });
    fixture = TestBed.createComponent(SellerPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
