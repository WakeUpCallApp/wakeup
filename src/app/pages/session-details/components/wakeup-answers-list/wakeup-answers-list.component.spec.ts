import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupAnswersListComponent } from './wakeup-answers-list.component';

describe('WakeupAnswersListComponent', () => {
  let component: WakeupAnswersListComponent;
  let fixture: ComponentFixture<WakeupAnswersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupAnswersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupAnswersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
