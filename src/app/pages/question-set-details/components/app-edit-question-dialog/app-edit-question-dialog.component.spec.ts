import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEditQuestionDialogComponent } from './app-edit-question-dialog.component';

describe('AppEditQuestionDialogComponent', () => {
  let component: AppEditQuestionDialogComponent;
  let fixture: ComponentFixture<AppEditQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppEditQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEditQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
