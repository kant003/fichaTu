import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrollmentCalificationsComponent } from './user-enrollment-califications.component';

describe('UserEnrollmentCalificationsComponent', () => {
  let component: UserEnrollmentCalificationsComponent;
  let fixture: ComponentFixture<UserEnrollmentCalificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEnrollmentCalificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEnrollmentCalificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
