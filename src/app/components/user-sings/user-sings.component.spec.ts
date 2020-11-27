import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSingsComponent } from './user-sings.component';

describe('UserSingsComponent', () => {
  let component: UserSingsComponent;
  let fixture: ComponentFixture<UserSingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
