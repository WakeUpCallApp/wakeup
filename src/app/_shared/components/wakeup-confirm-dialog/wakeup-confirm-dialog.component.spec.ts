import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupConfirmDialogComponent } from './wakeup-confirm-dialog.component';

describe('WakeupConfirmDialogComponent', () => {
  let component: WakeupConfirmDialogComponent;
  let fixture: ComponentFixture<WakeupConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
