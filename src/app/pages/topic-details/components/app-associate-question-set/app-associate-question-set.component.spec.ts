import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAssociateQuestionSetComponent } from './app-associate-question-set.component';

describe('AppAssociateQuestionSetComponent', () => {
  let component: AppAssociateQuestionSetComponent;
  let fixture: ComponentFixture<AppAssociateQuestionSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAssociateQuestionSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAssociateQuestionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
