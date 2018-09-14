import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartographyEditComponent } from './cartography-edit.component';

describe('CartographyEditComponent', () => {
  let component: CartographyEditComponent;
  let fixture: ComponentFixture<CartographyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartographyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartographyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
