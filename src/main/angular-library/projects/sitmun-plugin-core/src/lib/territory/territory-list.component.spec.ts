import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryListComponent } from './territory-list.component';

describe('TerritoryListComponent', () => {
  let component: TerritoryListComponent;
  let fixture: ComponentFixture<TerritoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
