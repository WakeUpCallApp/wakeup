import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeupImportFileComponent } from './wakeup-import-file.component';

describe('WakeupImportFileComponent', () => {
  let component: WakeupImportFileComponent;
  let fixture: ComponentFixture<WakeupImportFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeupImportFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeupImportFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
