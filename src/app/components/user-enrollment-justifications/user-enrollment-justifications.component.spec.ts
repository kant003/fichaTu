import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrollmentJustificationsComponent } from './user-enrollment-justifications.component';

describe('UserEnrollmentJustificationsComponent', () => {
  let component: UserEnrollmentJustificationsComponent;
  let fixture: ComponentFixture<UserEnrollmentJustificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEnrollmentJustificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEnrollmentJustificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
