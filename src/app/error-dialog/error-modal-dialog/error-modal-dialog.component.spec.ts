import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialog } from './error-modal-dialog.component';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialog;
  let fixture: ComponentFixture<ErrorDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule
      ],
      declarations: [
        ErrorDialog
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
