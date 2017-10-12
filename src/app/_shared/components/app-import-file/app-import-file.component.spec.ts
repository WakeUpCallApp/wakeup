import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppImportFileComponent } from './app-import-file.component';

describe('WakeupImportFileComponent', () => {
  let component: AppImportFileComponent;
  let fixture: ComponentFixture<AppImportFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppImportFileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppImportFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
