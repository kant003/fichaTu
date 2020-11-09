import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectEnrollmentsComponent } from './subject-enrollments.component';

describe('SubjectEnrollmentsComponent', () => {
  let component: SubjectEnrollmentsComponent;
  let fixture: ComponentFixture<SubjectEnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectEnrollmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
