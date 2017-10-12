import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppQuestionListComponent } from './app-question-list.component';

describe('AppQuestionListComponent', () => {
  let component: AppQuestionListComponent;
  let fixture: ComponentFixture<AppQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
