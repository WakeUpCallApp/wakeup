import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupEditQuestionDialogComponent } from './wakeup-edit-question-dialog.component';

describe('WakeupEditQuestionDialogComponent', () => {
  let component: WakeupEditQuestionDialogComponent;
  let fixture: ComponentFixture<WakeupEditQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupEditQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupEditQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
