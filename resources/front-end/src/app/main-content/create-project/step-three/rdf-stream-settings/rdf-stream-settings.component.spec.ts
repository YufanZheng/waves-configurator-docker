import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdfStreamSettingsComponent } from './rdf-stream-settings.component';

describe('RdfStreamSettingsComponent', () => {
  let component: RdfStreamSettingsComponent;
  let fixture: ComponentFixture<RdfStreamSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdfStreamSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdfStreamSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
