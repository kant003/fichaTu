import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentJustificationsAddDialogComponent } from './enrollment-justifications-add-dialog.component';

describe('EnrollmentJustificationsAddDialogComponent', () => {
  let component: EnrollmentJustificationsAddDialogComponent;
  let fixture: ComponentFixture<EnrollmentJustificationsAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentJustificationsAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentJustificationsAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
