import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorReistrationService } from '../doctor-registration/services/doctor-registration.service';
import { SpecializationRegistrationService } from '../specialization-registration/services/specialization-registration.service';
import { CoreService } from '../core/core.service';
import { SpecializationRegistration } from '../models/specialization-registration';
import { DoctorRegistration } from '../models/doctorregistration';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {

  doctorRegistrationForm: FormGroup;
  specializationList: SpecializationRegistration[] = [];

 constructor(
    private _fb: FormBuilder,
    private doctorRegistrationService: DoctorReistrationService,
    private specializationService: SpecializationRegistrationService,
    private _coreService: CoreService,
    ){
    this.doctorRegistrationForm = this._fb.group({
      firstName: ["Dr.", Validators.required],
      lastName: ["", Validators.required],
      doctorPhone: ["", [Validators.required, this.phoneValidator]],
      doctorEmail: ["", Validators.email],
      doctorExperience: ["", Validators.required],
      doctorRemarks: "",
      doctorQualification: ["", Validators.required],
      gender: "",
      specialization: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.specializationService.fetchAllSpecialization().subscribe((specData) => {
    this.specializationList = specData;
    });
  }

  onFormSubmit() {
    if (this.doctorRegistrationForm.valid) {
      console.log(this.doctorRegistrationForm.value);
      const doctor: DoctorRegistration = {
        id: this.doctorRegistrationForm.value.id,
        firstName: this.doctorRegistrationForm.value.firstName,
        lastName: this.doctorRegistrationForm.value.lastName,
        gender: this.doctorRegistrationForm.value.gender,
        doctorEmail: this.doctorRegistrationForm.value.doctorEmail,
        doctorPhone: this.doctorRegistrationForm.value.doctorPhone,
        doctorExperience: this.doctorRegistrationForm.value.doctorExperience,
        doctorQualification: this.doctorRegistrationForm.value.doctorQualification,
        doctorRemarks: this.doctorRegistrationForm.value.doctorRemarks,
        specialization: {id: parseInt(this.doctorRegistrationForm.value.specialization),},
      };
        this.doctorRegistrationService.saveDoctor(doctor).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Doctor Registration added successfully");
            this.doctorRegistrationForm.reset();
            Object.keys(this.doctorRegistrationForm.controls).forEach((key) => {
            this.doctorRegistrationForm.get(key)?.setErrors(null);
            });
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  
  phoneValidator(control: AbstractControl): { [key: string]: any } | null {
    const phoneNumber = control.value;
    const validPattern = /^[6-9][0-9]{9}$/;
    if (phoneNumber && !validPattern.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }
      return null;
  }
}



