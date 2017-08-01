import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupAddCommentComponent } from './wakeup-add-comment.component';

describe('WakeupAddCommentComponent', () => {
  let component: WakeupAddCommentComponent;
  let fixture: ComponentFixture<WakeupAddCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupAddCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupAddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
