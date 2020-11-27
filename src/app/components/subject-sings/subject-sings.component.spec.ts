import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSingsComponent } from './subject-sings.component';

describe('EnrollmentsSingsComponent', () => {
  let component: SubjectSingsComponent;
  let fixture: ComponentFixture<SubjectSingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectSingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectSingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
