import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PatientRegistrationService } from '../service/patient-registration.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-patient-registration-add-edit',
  templateUrl: './patient-registration-add-edit.component.html',
  styleUrls: ['./patient-registration-add-edit.component.scss']
})
export class PatientRegistrationAddEditComponent implements OnInit{

  patientRegistrationForm: FormGroup;
  constructor(
                private _fb: FormBuilder,
                private patientService:PatientRegistrationService,
                private _coreService:CoreService,
                public _dialogRef:DialogRef,
                @Inject(MAT_DIALOG_DATA) public data: any,
              ) {
    this.patientRegistrationForm = this._fb.group({
      patientName: ["", Validators.required],
      patientPhone: ["", [Validators.required, this.phoneValidator]],
      patientEmail: ["", [Validators.email]],
      patientOccupation: [""],
      comments: [""],
    });
  }

  ngOnInit(): void {
    this.patientRegistrationForm.patchValue(this.data);
 }

  onFormSubmit() {
      if(this.patientRegistrationForm.valid){
        console.log("form data----" ,this.patientRegistrationForm.value);
        if(this.data){  
          this.patientService.updatePatient(this.data.id,this.patientRegistrationForm.value).subscribe({
            next:(val:any)=>{
              this._coreService.openSnackBar("Patient Details Updated Successfully", "Close");
            this.patientRegistrationForm.reset();
            Object.keys(this.patientRegistrationForm.controls).forEach((key) => {
              this.patientRegistrationForm.get(key)?.setErrors(null);
            });
            },
          });
        }else{
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
