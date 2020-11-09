import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentsOrderComponent } from './enrollments-order.component';

describe('EnrollmentsOrderComponent', () => {
  let component: EnrollmentsOrderComponent;
  let fixture: ComponentFixture<EnrollmentsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
