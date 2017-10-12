import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSideNavComponent } from './app-side-nav.component';

describe('AppSideNavComponent', () => {
  let component: AppSideNavComponent;
  let fixture: ComponentFixture<AppSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
