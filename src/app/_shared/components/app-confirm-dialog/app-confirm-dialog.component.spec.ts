import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConfirmDialogComponent } from './app-confirm-dialog.component';

describe('AppConfirmDialogComponent', () => {
  let component: AppConfirmDialogComponent;
  let fixture: ComponentFixture<AppConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
