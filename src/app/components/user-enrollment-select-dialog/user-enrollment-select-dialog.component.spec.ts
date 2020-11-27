import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrollmentSelectDialogComponent } from './user-enrollment-select-dialog.component';

describe('UserEnrollmentSelectDialogComponent', () => {
  let component: UserEnrollmentSelectDialogComponent;
  let fixture: ComponentFixture<UserEnrollmentSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEnrollmentSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEnrollmentSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
