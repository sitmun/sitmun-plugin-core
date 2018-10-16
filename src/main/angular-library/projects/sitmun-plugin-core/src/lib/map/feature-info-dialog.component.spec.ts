import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureInfoDialogComponent } from './feature-info-dialog.component';

import { TranslateService, TranslatePipe } from "@ngx-translate/core";

describe('FeatureInfoDialogData', () => {
  let component: FeatureInfoDialogComponent;
  let fixture: ComponentFixture<FeatureInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});