import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupEditAnswerDialogComponent } from './wakeup-edit-answer-dialog.component';

describe('WakeupEditAnswerDialogComponent', () => {
  let component: WakeupEditAnswerDialogComponent;
  let fixture: ComponentFixture<WakeupEditAnswerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupEditAnswerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupEditAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
