import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddQuestionComponent } from './app-add-question.component';

describe('AppAddQuestionComponent', () => {
  let component: AppAddQuestionComponent;
  let fixture: ComponentFixture<AppAddQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAddQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
