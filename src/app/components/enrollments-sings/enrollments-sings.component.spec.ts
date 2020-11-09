import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentsSingsComponent } from './enrollments-sings.component';

describe('EnrollmentsSingsComponent', () => {
  let component: EnrollmentsSingsComponent;
  let fixture: ComponentFixture<EnrollmentsSingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentsSingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentsSingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
