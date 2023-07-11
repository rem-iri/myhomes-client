import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSummaryComponent } from './agent-summary.component';

describe('AgentSummaryComponent', () => {
  let component: AgentSummaryComponent;
  let fixture: ComponentFixture<AgentSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentSummaryComponent]
    });
    fixture = TestBed.createComponent(AgentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
