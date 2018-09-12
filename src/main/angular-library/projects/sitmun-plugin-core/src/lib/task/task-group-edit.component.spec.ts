import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGroupEditComponent } from './task-group-edit.component';

describe('TaskGroupEditComponent', () => {
  let component: TaskGroupEditComponent;
  let fixture: ComponentFixture<TaskGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
