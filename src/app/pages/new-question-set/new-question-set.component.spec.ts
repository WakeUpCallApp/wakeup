import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionSetComponent } from './new-question-set.component';

describe('NewQuestionSetComponent', () => {
  let component: NewQuestionSetComponent;
  let fixture: ComponentFixture<NewQuestionSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuestionSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuestionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
