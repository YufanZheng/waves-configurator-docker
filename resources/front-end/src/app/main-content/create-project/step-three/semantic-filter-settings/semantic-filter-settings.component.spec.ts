import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticFilterSettingsComponent } from './semantic-filter-settings.component';

describe('SemanticFilterSettingsComponent', () => {
  let component: SemanticFilterSettingsComponent;
  let fixture: ComponentFixture<SemanticFilterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticFilterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticFilterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
