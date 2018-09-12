import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionEditComponent } from './connection-edit.component';

describe('ConnectionEditComponent', () => {
  let component: ConnectionEditComponent;
  let fixture: ComponentFixture<ConnectionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
