import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptySettingsComponent } from './empty-settings.component';

describe('EmptySettingsComponent', () => {
  let component: EmptySettingsComponent;
  let fixture: ComponentFixture<EmptySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
