import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSessionConfigComponent } from './app-session-config.component';

describe('AppSessionConfigComponent', () => {
  let component: AppSessionConfigComponent;
  let fixture: ComponentFixture<AppSessionConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSessionConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSessionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
