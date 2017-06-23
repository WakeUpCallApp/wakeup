import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupAssociateQuestionSetComponent } from './wakeup-associate-question-set.component';

describe('WakeupAssociateQuestionSetComponent', () => {
  let component: WakeupAssociateQuestionSetComponent;
  let fixture: ComponentFixture<WakeupAssociateQuestionSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupAssociateQuestionSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupAssociateQuestionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
