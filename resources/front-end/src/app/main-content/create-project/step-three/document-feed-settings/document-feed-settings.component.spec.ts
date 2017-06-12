import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFeedSettingsComponent } from './document-feed-settings.component';

describe('DocumentFeedSettingsComponent', () => {
  let component: DocumentFeedSettingsComponent;
  let fixture: ComponentFixture<DocumentFeedSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentFeedSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentFeedSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
