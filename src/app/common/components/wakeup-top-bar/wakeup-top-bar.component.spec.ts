import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupTopBarComponent } from './wakeup-top-bar.component';

describe('WakeupTopBarComponent', () => {
  let component: WakeupTopBarComponent;
  let fixture: ComponentFixture<WakeupTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupTopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
