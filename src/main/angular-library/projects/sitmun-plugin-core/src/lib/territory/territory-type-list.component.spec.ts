import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryTypeListComponent } from './territory-type-list.component';

describe('TerritoryTypeListComponent', () => {
  let component: TerritoryTypeListComponent;
  let fixture: ComponentFixture<TerritoryTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritoryTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
