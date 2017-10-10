import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupFooterComponent } from './wakeup-footer.component';

describe('WakeupFooterComponent', () => {
  let component: WakeupFooterComponent;
  let fixture: ComponentFixture<WakeupFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
