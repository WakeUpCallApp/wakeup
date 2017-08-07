import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupQuestionsBrowserComponent } from './wakeup-questions-browser.component';

describe('WakeupQuestionsBrowserComponent', () => {
  let component: WakeupQuestionsBrowserComponent;
  let fixture: ComponentFixture<WakeupQuestionsBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupQuestionsBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupQuestionsBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
