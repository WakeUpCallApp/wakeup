import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppQuestionsBrowserComponent } from './app-questions-browser.component';

describe('AppQuestionsBrowserComponent', () => {
  let component: AppQuestionsBrowserComponent;
  let fixture: ComponentFixture<AppQuestionsBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppQuestionsBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppQuestionsBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
