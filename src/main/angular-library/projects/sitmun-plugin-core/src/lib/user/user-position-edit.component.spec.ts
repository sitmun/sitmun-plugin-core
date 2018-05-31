import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPositionEditComponent } from './user-position-edit.component';

describe('UserPositionEditComponent', () => {
  let component: UserPositionEditComponent;
  let fixture: ComponentFixture<UserPositionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPositionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPositionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
