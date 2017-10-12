import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppQuotesBrowserComponent } from './app-quotes-browser.component';

describe('AppQuotesBrowserComponent', () => {
  let component: AppQuotesBrowserComponent;
  let fixture: ComponentFixture<AppQuotesBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppQuotesBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppQuotesBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
