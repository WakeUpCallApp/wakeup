import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupQuoteQuestionsComponent } from './wakeup-quote-questions.component';

describe('WakeupQuoteQuestionsComponent', () => {
  let component: WakeupQuoteQuestionsComponent;
  let fixture: ComponentFixture<WakeupQuoteQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupQuoteQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupQuoteQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
