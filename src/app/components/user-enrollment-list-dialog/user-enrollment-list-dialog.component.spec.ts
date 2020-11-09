import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrollmentListDialogComponent } from './user-enrollment-list-dialog.component';

describe('UserEnrollmentListDialogComponent', () => {
  let component: UserEnrollmentListDialogComponent;
  let fixture: ComponentFixture<UserEnrollmentListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEnrollmentListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEnrollmentListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
