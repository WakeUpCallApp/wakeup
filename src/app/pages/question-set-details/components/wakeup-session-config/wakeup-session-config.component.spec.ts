import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupSessionConfigComponent } from './wakeup-session-config.component';

describe('WakeupSessionConfigComponent', () => {
  let component: WakeupSessionConfigComponent;
  let fixture: ComponentFixture<WakeupSessionConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupSessionConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupSessionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
