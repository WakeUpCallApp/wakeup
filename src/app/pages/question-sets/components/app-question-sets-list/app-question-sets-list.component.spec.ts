import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppQuestionSetsListComponent } from './app-question-sets-list.component';

describe('AppQuestionSetsListComponent', () => {
  let component: AppQuestionSetsListComponent;
  let fixture: ComponentFixture<AppQuestionSetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppQuestionSetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppQuestionSetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
