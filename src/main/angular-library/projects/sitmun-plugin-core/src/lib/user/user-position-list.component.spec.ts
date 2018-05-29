import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPositionListComponent } from './user-position-list.component';

describe('UserPositionListComponent', () => {
  let component: UserPositionListComponent;
  let fixture: ComponentFixture<UserPositionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPositionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
