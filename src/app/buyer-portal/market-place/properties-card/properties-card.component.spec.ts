import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesCardComponent } from './properties-card.component';

describe('PropertiesCardComponent', () => {
  let component: PropertiesCardComponent;
  let fixture: ComponentFixture<PropertiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesCardComponent]
    });
    fixture = TestBed.createComponent(PropertiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
