import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalSourcesSettingsComponent } from './external-sources-settings.component';

describe('ExternalSourcesSettingsComponent', () => {
  let component: ExternalSourcesSettingsComponent;
  let fixture: ComponentFixture<ExternalSourcesSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalSourcesSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalSourcesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
