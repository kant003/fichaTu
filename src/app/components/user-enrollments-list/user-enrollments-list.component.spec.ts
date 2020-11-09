import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrollmentsListComponent } from './user-enrollments-list.component';

describe('UserEnrollmentsListComponent', () => {
  let component: UserEnrollmentsListComponent;
  let fixture: ComponentFixture<UserEnrollmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEnrollmentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEnrollmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
