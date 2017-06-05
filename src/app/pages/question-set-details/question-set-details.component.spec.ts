import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSetDetailsComponent } from './question-set-details.component';

describe('QuestionSetDetailsComponent', () => {
  let component: QuestionSetDetailsComponent;
  let fixture: ComponentFixture<QuestionSetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
