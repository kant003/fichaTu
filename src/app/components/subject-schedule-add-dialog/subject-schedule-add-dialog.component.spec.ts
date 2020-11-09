import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectScheduleAddDialogComponent } from './subject-schedule-add-dialog.component';

describe('SubjectScheduleAddDialogComponent', () => {
  let component: SubjectScheduleAddDialogComponent;
  let fixture: ComponentFixture<SubjectScheduleAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectScheduleAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectScheduleAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
