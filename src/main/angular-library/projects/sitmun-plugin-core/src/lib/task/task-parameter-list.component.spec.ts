import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskParameterListComponent } from './task-parameter-list.component';

describe('TaskParameterListComponent', () => {
  let component: TaskParameterListComponent;
  let fixture: ComponentFixture<TaskParameterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskParameterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskParameterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
