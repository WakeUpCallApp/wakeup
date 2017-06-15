import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupQuestionComponent } from './wakeup-question.component';

describe('WakeupQuestionComponent', () => {
  let component: WakeupQuestionComponent;
  let fixture: ComponentFixture<WakeupQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
