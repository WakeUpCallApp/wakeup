import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCommentListComponent } from './app-comment-list.component';

describe('AppCommentListComponent', () => {
  let component: AppCommentListComponent;
  let fixture: ComponentFixture<AppCommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCommentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
