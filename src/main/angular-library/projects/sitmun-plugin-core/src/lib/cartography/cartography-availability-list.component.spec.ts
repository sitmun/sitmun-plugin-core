import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartographyAvailabilityListComponent } from './cartography-availability-list.component';

describe('CartographyAvailabilityListComponent', () => {
  let component: CartographyAvailabilityListComponent;
  let fixture: ComponentFixture<CartographyAvailabilityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartographyAvailabilityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartographyAvailabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
