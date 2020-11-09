import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityTestComponent } from './security-test.component';

describe('SecurityTestComponent', () => {
  let component: SecurityTestComponent;
  let fixture: ComponentFixture<SecurityTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
