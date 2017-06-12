import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawStreamSettingsComponent } from './raw-stream-settings.component';

describe('RawStreamSettingsComponent', () => {
  let component: RawStreamSettingsComponent;
  let fixture: ComponentFixture<RawStreamSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawStreamSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawStreamSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
