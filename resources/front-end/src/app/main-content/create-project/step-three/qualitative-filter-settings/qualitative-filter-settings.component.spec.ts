import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitativeFilterSettingsComponent } from './qualitative-filter-settings.component';

describe('QualitativeFilterSettingsComponent', () => {
  let component: QualitativeFilterSettingsComponent;
  let fixture: ComponentFixture<QualitativeFilterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualitativeFilterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitativeFilterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
