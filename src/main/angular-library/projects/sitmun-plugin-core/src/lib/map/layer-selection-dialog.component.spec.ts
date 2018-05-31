import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerSelectionDialogComponent } from './layer-selection-dialog.component';

import { TranslateService, TranslatePipe } from "@ngx-translate/core";

describe('MapComponent', () => {
  let component: LayerSelectionDialogComponent;
  let fixture: ComponentFixture<LayerSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});