import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesDetailComponent } from './properties-detail.component';

describe('PropertiesDetailComponent', () => {
  let component: PropertiesDetailComponent;
  let fixture: ComponentFixture<PropertiesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesDetailComponent]
    });
    fixture = TestBed.createComponent(PropertiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
