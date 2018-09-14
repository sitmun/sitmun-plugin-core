import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartographyGroupListComponent } from './cartography-group-list.component';

describe('CartographyGroupListComponent', () => {
  let component: CartographyGroupListComponent;
  let fixture: ComponentFixture<CartographyGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartographyGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartographyGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
