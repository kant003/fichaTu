import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCalificationsComponent } from './subject-califications.component';

describe('SubjectCalificationsComponent', () => {
  let component: SubjectCalificationsComponent;
  let fixture: ComponentFixture<SubjectCalificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectCalificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectCalificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
