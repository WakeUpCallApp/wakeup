import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSetsComponent } from './question-sets.component';

describe('QuestionSetsComponent', () => {
  let component: QuestionSetsComponent;
  let fixture: ComponentFixture<QuestionSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
