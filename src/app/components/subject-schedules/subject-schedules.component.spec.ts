import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSchedulesComponent } from './subject-schedules.component';

describe('SubjectScheduleComponent', () => {
  let component: SubjectSchedulesComponent;
  let fixture: ComponentFixture<SubjectSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
