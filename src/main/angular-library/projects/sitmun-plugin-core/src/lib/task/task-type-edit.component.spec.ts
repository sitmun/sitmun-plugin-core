import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTypeEditComponent } from './task-type-edit.component';

describe('TaskTypeEditComponent', () => {
  let component: TaskTypeEditComponent;
  let fixture: ComponentFixture<TaskTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
