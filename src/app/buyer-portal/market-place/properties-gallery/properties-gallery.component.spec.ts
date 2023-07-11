import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesGalleryComponent } from './properties-gallery.component';

describe('PropertiesGalleryComponent', () => {
  let component: PropertiesGalleryComponent;
  let fixture: ComponentFixture<PropertiesGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesGalleryComponent]
    });
    fixture = TestBed.createComponent(PropertiesGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
