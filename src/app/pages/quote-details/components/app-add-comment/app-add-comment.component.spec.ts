import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddCommentComponent } from './app-add-comment.component';

describe('AppAddCommentComponent', () => {
  let component: AppAddCommentComponent;
  let fixture: ComponentFixture<AppAddCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAddCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
