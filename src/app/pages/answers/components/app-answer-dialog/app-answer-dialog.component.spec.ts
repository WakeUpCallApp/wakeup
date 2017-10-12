import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAnswerDialogComponent } from './app-answer-dialog.component';

describe('AppAnswerDialogComponent', () => {
  let component: AppAnswerDialogComponent;
  let fixture: ComponentFixture<AppAnswerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAnswerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
