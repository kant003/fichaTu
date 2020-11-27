import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentSingsComponent } from './enrollment-sings.component';

describe('UserEnrollmentSingComponent', () => {
  let component: EnrollmentSingsComponent;
  let fixture: ComponentFixture<EnrollmentSingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentSingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentSingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
