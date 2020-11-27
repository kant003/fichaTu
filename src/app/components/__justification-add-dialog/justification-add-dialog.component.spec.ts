import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificationAddDialogComponent } from './justification-add-dialog.component';

describe('JustificationAddDialogComponent', () => {
  let component: JustificationAddDialogComponent;
  let fixture: ComponentFixture<JustificationAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustificationAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificationAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
