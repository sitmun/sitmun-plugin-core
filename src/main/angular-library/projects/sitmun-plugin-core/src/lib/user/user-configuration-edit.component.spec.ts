import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfigurationEditComponent } from './user-configuration-edit.component';

describe('UserConfigurationEditComponent', () => {
  let component: UserConfigurationEditComponent;
  let fixture: ComponentFixture<UserConfigurationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConfigurationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfigurationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
