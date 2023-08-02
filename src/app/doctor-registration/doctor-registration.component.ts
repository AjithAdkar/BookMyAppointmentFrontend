import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormControl, FormBuilder } from '@angular/forms';
import { DoctorReistrationService } from './services/doctor-registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss']
})

export class DoctorRegistrationComponent implements OnInit{
  doctorRegistrationForm: FormGroup;
  specializationData: any[] =[];
  routes: any;
  
  data: any;
  private _coreService: any;
  private _dialogRef: any;
  doctorregistration:any;


  

  

   constructor(
      private _fb: FormBuilder,
  
      private doctorRegistrationService:DoctorReistrationService,
      
    


    )
   
    {
      this.doctorRegistrationForm = this._fb.group({
        firstName: ['Dr.',Validators.required],
        lastName:['',Validators.required],
        
        doctorPhone: ['',Validators.required],
        doctorEmail: ['',Validators.required],
        doctorExperience:['',Validators.required,],
        doctorRemarks:'',
        doctorQualification:['',Validators.required,],
        gender:'',
        specialization:['',Validators.required]

      });
    }
  

  
    ngOnInit() :void{
      
    }

    registerDoctor():void{
      const firstName = this.doctorRegistrationForm.get('firstName')?.value;
      const lastName = this.doctorRegistrationForm.get('lastName')?.value;

      this.doctorRegistrationService.setDoctorName(firstName, lastName);
      this.routes.navigate(['/show-doctor-details']);

    }
   



  
  
  onFormSubmit(){
    if (this.doctorRegistrationForm.valid) {
      if (this.data) {
        this.doctorRegistrationService
          .updateDoctor(this.data.id, this.doctorRegistrationForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('doctor updated successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
      this.doctorRegistrationService.saveDoctor(this.doctorRegistrationForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('doctor added successfully');
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
    
