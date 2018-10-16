import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUiEditComponent } from './task-ui-edit.component';

describe('TaskUiEditComponent', () => {
  let component: TaskUiEditComponent;
  let fixture: ComponentFixture<TaskUiEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskUiEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskUiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
