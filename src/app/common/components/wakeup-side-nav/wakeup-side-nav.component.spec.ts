import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupSideNavComponent } from './wakeup-side-nav.component';

describe('WakeupSideNavComponent', () => {
  let component: WakeupSideNavComponent;
  let fixture: ComponentFixture<WakeupSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
