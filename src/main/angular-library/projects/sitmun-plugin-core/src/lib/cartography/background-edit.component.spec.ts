import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundEditComponent } from './background-edit.component';

describe('BackgroundEditComponent', () => {
  let component: BackgroundEditComponent;
  let fixture: ComponentFixture<BackgroundEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
