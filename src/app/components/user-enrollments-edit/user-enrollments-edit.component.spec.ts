import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrollmentsEditComponent } from './user-enrollments-edit.component';

describe('UserEnrollmentsEditComponent', () => {
  let component: UserEnrollmentsEditComponent;
  let fixture: ComponentFixture<UserEnrollmentsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEnrollmentsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEnrollmentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
