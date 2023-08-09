import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CoreService } from '../core/core.service';
import { PatientRegistrationService } from '../patient-registration/service/patient-registration.service';

@Component({
  selector: 'app-add-patients',
  templateUrl: './add-patients.component.html',
  styleUrls: ['./add-patients.component.scss']
})
export class AddPatientsComponent {

  patientRegistrationForm: FormGroup;

  constructor(
                private _fb: FormBuilder,
                private patientService:PatientRegistrationService,
                private _coreService:CoreService,
              ) {
    this.patientRegistrationForm = this._fb.group({
      patientName: ["", Validators.required],
      patientPhone: ["", [Validators.required, this.phoneValidator]],
      patientEmail: ["", [Validators.email]],
      patientOccupation: [""],
      comments: [""],
    });
  }


  onFormSubmit() {
      if(this.patientRegistrationForm.valid){
        this.patientService.savePatient(this.patientRegistrationForm.value).subscribe({
          next:(val:any)=>{
            this._coreService.openSnackBar('Patient Details Saved SuccessFully',"Close");
            this.patientRegistrationForm.reset();
            Object.keys(this.patientRegistrationForm.controls).forEach(key => {
              this.patientRegistrationForm.get(key)?.setErrors(null);
            });
          },
          error:(err:any)=>{
            console.log(`Error Occured `,err);
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
