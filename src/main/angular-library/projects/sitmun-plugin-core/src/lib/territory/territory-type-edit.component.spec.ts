import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryTypeEditComponent } from './territory-type-edit.component';

describe('TerritoryTypeEditComponent', () => {
  let component: TerritoryTypeEditComponent;
  let fixture: ComponentFixture<TerritoryTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritoryTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
