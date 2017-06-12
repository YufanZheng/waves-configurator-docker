import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompresserSettingsComponent } from './compresser-settings.component';

describe('CompresserSettingsComponent', () => {
  let component: CompresserSettingsComponent;
  let fixture: ComponentFixture<CompresserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompresserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompresserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
