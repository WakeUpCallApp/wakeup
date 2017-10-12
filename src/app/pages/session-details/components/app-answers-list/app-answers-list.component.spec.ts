import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAnswersListComponent } from './app-answers-list.component';

describe('AppAnswersListComponent', () => {
  let component: AppAnswersListComponent;
  let fixture: ComponentFixture<AppAnswersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAnswersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAnswersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
