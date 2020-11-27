import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectOrderComponent } from './subject-order.component';

describe('EnrollmentsOrderComponent', () => {
  let component: SubjectOrderComponent;
  let fixture: ComponentFixture<SubjectOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
