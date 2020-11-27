import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentJustificationsComponent } from './enrollment-justifications.component';

describe('UserEnrollmentJustificationsComponent', () => {
  let component: EnrollmentJustificationsComponent;
  let fixture: ComponentFixture<EnrollmentJustificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentJustificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentJustificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
