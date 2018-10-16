import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUiListComponent } from './task-ui-list.component';

describe('TaskUiListComponent', () => {
  let component: TaskUiListComponent;
  let fixture: ComponentFixture<TaskUiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskUiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskUiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
