import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrollmentJustificationsAddDialogComponent } from './user-enrollment-justifications-add-dialog.component';

describe('UserEnrollmentJustificationsAddDialogComponent', () => {
  let component: UserEnrollmentJustificationsAddDialogComponent;
  let fixture: ComponentFixture<UserEnrollmentJustificationsAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEnrollmentJustificationsAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEnrollmentJustificationsAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
