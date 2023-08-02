import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegistrationAddEditComponent } from './patient-registration-add-edit.component';

describe('PatientRegistrationAddEditComponent', () => {
  let component: PatientRegistrationAddEditComponent;
  let fixture: ComponentFixture<PatientRegistrationAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRegistrationAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRegistrationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
