import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyDetectionSettingsComponent } from './anomaly-detection-settings.component';

describe('AnomalyDetectionSettingsComponent', () => {
  let component: AnomalyDetectionSettingsComponent;
  let fixture: ComponentFixture<AnomalyDetectionSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnomalyDetectionSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomalyDetectionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
