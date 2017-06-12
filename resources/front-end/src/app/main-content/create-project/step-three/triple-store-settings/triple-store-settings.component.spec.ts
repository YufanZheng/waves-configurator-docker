import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripleStoreSettingsComponent } from './triple-store-settings.component';

describe('TripleStoreSettingsComponent', () => {
  let component: TripleStoreSettingsComponent;
  let fixture: ComponentFixture<TripleStoreSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripleStoreSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripleStoreSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
