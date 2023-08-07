import { Component, Inject, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  AbstractControl,
} from "@angular/forms";
import { DoctorReistrationService } from "./services/doctor-registration.service";
import { SpecializationRegistrationService } from "../specialization-registration/services/specialization-registration.service";
import { SpecializationRegistration } from "../models/specialization-registration";
import { CoreService } from "../core/core.service";
import { DoctorRegistration } from "../models/doctorregistration";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-doctor-registration",
  templateUrl: "./doctor-registration.component.html",
  styleUrls: ["./doctor-registration.component.scss"],
})
export class DoctorRegistrationComponent implements OnInit {
  doctorRegistrationForm: FormGroup;
  specializationList: SpecializationRegistration[] = [];
  data: any;
  constructor(
    private _fb: FormBuilder,
    private doctorRegistrationService: DoctorReistrationService,
    private specializationService: SpecializationRegistrationService,
    private _coreService: CoreService
  ) {
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
    this.specializationService.getAllSpecialization().subscribe((specData) => {
      this.specializationList = specData;
      this.doctorRegistrationForm.patchValue(this.data);
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
        specialization: {
          id: parseInt(this.doctorRegistrationForm.value.specialization),
        },
      };
      if (this.data) {
        this.doctorRegistrationService
          .updateDoctorById(this.data.id, doctor)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar("Doctor updated successfully");
              this.doctorRegistrationForm.reset();
              this.doctorRegistrationForm.get('firstName')?.setValue('Dr.');
              Object.keys(this.doctorRegistrationForm.controls).forEach(
                (key) => {
                  this.doctorRegistrationForm.get(key)?.setErrors(null);
            });
           },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.doctorRegistrationService.saveDoctor(doctor).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar(
              "Doctor Registration added successfully"
            );
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
