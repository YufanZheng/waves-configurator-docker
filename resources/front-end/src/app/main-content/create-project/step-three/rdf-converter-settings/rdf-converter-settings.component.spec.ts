import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdfConverterSettingsComponent } from './rdf-converter-settings.component';

describe('RdfConverterSettingsComponent', () => {
  let component: RdfConverterSettingsComponent;
  let fixture: ComponentFixture<RdfConverterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdfConverterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdfConverterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
