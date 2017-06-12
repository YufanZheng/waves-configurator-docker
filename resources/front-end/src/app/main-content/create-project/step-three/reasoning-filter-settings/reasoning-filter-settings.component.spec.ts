import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasoningFilterSettingsComponent } from './reasoning-filter-settings.component';

describe('ReasoningFilterSettingsComponent', () => {
  let component: ReasoningFilterSettingsComponent;
  let fixture: ComponentFixture<ReasoningFilterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasoningFilterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasoningFilterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
