import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfigurationListComponent } from './user-configuration-list.component';

describe('UserConfigurationListComponent', () => {
  let component: UserConfigurationListComponent;
  let fixture: ComponentFixture<UserConfigurationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConfigurationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
