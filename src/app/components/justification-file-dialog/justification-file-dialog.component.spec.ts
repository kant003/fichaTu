import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificationFileDialogComponent } from './justification-file-dialog.component';

describe('JustificationFileDialogComponent', () => {
  let component: JustificationFileDialogComponent;
  let fixture: ComponentFixture<JustificationFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustificationFileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificationFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
