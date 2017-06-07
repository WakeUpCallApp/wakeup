import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupCardComponent } from './wakeup-card.component';

describe('WakeupCardComponent', () => {
  let component: WakeupCardComponent;
  let fixture: ComponentFixture<WakeupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
