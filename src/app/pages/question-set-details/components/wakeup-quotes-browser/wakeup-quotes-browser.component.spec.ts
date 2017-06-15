import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupQuotesBrowserComponent } from './wakeup-quotes-browser.component';

describe('WakeupQuotesBrowserComponent', () => {
  let component: WakeupQuotesBrowserComponent;
  let fixture: ComponentFixture<WakeupQuotesBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupQuotesBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupQuotesBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
