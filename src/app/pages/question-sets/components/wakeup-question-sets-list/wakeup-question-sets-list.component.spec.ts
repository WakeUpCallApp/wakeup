import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupQuestionSetsListComponent } from './wakeup-question-sets-list.component';

describe('WakeupQuestionSetsListComponent', () => {
  let component: WakeupQuestionSetsListComponent;
  let fixture: ComponentFixture<WakeupQuestionSetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupQuestionSetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupQuestionSetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
