import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationRegistrationAddEditComponent } from './specialization-registration-add-edit.component';

describe('SpecializationRegistrationAddEditComponent', () => {
  let component: SpecializationRegistrationAddEditComponent;
  let fixture: ComponentFixture<SpecializationRegistrationAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecializationRegistrationAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializationRegistrationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
