import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppQuoteQuestionsComponent } from './app-quote-questions.component';

describe('AppQuoteQuestionsComponent', () => {
  let component: AppQuoteQuestionsComponent;
  let fixture: ComponentFixture<AppQuoteQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppQuoteQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppQuoteQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
