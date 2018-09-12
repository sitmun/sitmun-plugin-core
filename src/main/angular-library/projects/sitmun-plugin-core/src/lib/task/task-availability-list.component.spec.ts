import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAvailabilityListComponent } from './task-availability-list.component';

describe('TaskAvailabilityListComponent', () => {
  let component: TaskAvailabilityListComponent;
  let fixture: ComponentFixture<TaskAvailabilityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAvailabilityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAvailabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
