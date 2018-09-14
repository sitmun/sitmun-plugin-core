import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartographyListComponent } from './cartography-list.component';

describe('CartographyListComponent', () => {
  let component: CartographyListComponent;
  let fixture: ComponentFixture<CartographyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartographyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartographyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
