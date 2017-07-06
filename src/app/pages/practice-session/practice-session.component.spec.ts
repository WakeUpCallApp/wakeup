import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionComponent } from './practice-session.component';

describe('PracticeSessionComponent', () => {
  let component: PracticeSessionComponent;
  let fixture: ComponentFixture<PracticeSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
