import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPortalComponent } from './guest-portal.component';

describe('GuestPortalComponent', () => {
  let component: GuestPortalComponent;
  let fixture: ComponentFixture<GuestPortalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestPortalComponent]
    });
    fixture = TestBed.createComponent(GuestPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
