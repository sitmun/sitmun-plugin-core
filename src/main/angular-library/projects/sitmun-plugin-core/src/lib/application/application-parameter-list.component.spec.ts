import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationParameterListComponent } from './application-parameter-list.component';

describe('ApplicationParameterListComponent', () => {
  let component: ApplicationParameterListComponent;
  let fixture: ComponentFixture<ApplicationParameterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationParameterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationParameterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
