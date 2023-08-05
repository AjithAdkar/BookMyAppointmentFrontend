import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { SpecializationRegistrationService } from '../services/specialization-registration.service';

@Component({
  selector: 'app-specialization-registration-add-edit',
  templateUrl: './specialization-registration-add-edit.component.html',
  styleUrls: ['./specialization-registration-add-edit.component.scss']
})

export class SpecializationRegistrationAddEditComponent implements OnInit {
  specializationRegistrationForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private specializationRegistrationService: SpecializationRegistrationService,
    public _dialogRef: MatDialogRef<SpecializationRegistrationAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.specializationRegistrationForm = this._fb.group({
      specializationName: ['', Validators.required],
      specializationDescription: '',
    });
  }

  ngOnInit(): void {
    this.specializationRegistrationForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.specializationRegistrationForm.valid) {
      console.log(this.specializationRegistrationForm.value);

      if (this.data) {
        this.specializationRegistrationService
          .updateSpecializationById(this.data.id, this.specializationRegistrationForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Specialization updated successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.specializationRegistrationService.saveSpecialization(this.specializationRegistrationForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Specialization Registration added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
