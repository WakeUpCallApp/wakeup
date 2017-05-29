import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWakeupCallComponent } from './login-wakeup-call.component';

describe('LoginWakeupCallComponent', () => {
  let component: LoginWakeupCallComponent;
  let fixture: ComponentFixture<LoginWakeupCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWakeupCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWakeupCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
