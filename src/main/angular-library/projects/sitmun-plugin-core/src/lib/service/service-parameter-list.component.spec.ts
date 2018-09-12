import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceParameterListComponent } from './service-parameter-list.component';

describe('ServiceParameterListComponent', () => {
  let component: ServiceParameterListComponent;
  let fixture: ComponentFixture<ServiceParameterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceParameterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceParameterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
