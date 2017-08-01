import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupCommentListComponent } from './wakeup-comment-list.component';

describe('WakeupCommentListComponent', () => {
  let component: WakeupCommentListComponent;
  let fixture: ComponentFixture<WakeupCommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupCommentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
