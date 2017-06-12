import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativeFilterSettingsComponent } from './quantitative-filter-settings.component';

describe('QuantitativeFilterSettingsComponent', () => {
  let component: QuantitativeFilterSettingsComponent;
  let fixture: ComponentFixture<QuantitativeFilterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantitativeFilterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitativeFilterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
