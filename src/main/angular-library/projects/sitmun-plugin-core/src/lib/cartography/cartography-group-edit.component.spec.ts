import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartographyGroupEditComponent } from './cartography-group-edit.component';

describe('CartographyGroupEditComponent', () => {
  let component: CartographyGroupEditComponent;
  let fixture: ComponentFixture<CartographyGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartographyGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartographyGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
