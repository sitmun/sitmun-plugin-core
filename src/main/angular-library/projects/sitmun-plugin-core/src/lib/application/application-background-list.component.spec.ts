import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBackgroundListComponent } from './application-background-list.component';

describe('ApplicationBackgroundListComponent', () => {
  let component: ApplicationBackgroundListComponent;
  let fixture: ComponentFixture<ApplicationBackgroundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationBackgroundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationBackgroundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
