import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificationsComponent } from './enrollment-califications.component';

describe('CalificationsComponent', () => {
  let component: CalificationsComponent;
  let fixture: ComponentFixture<CalificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
