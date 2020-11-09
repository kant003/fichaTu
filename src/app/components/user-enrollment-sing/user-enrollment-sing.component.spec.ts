import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrollmentSingComponent } from './user-enrollment-sing.component';

describe('UserEnrollmentSingComponent', () => {
  let component: UserEnrollmentSingComponent;
  let fixture: ComponentFixture<UserEnrollmentSingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEnrollmentSingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEnrollmentSingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
