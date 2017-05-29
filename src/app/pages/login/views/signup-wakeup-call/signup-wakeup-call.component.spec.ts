import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupWakeupCallComponent } from './signup-wakeup-call.component';

describe('SignupWakeupCallComponent', () => {
  let component: SignupWakeupCallComponent;
  let fixture: ComponentFixture<SignupWakeupCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupWakeupCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupWakeupCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
