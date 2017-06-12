import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlEndpointSettingsComponent } from './sparql-endpoint-settings.component';

describe('SparqlEndpointSettingsComponent', () => {
  let component: SparqlEndpointSettingsComponent;
  let fixture: ComponentFixture<SparqlEndpointSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparqlEndpointSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparqlEndpointSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
