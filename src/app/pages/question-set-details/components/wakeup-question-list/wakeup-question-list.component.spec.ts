import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupQuestionListComponent } from './wakeup-question-list.component';

describe('WakeupQuestionListComponent', () => {
  let component: WakeupQuestionListComponent;
  let fixture: ComponentFixture<WakeupQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
