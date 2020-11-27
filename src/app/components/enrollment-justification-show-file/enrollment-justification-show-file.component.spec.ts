import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentJustificationShowFileComponent } from './enrollment-justification-show-file.component';

describe('JustificationFileDialogComponent', () => {
  let component: EnrollmentJustificationShowFileComponent;
  let fixture: ComponentFixture<EnrollmentJustificationShowFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentJustificationShowFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentJustificationShowFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
