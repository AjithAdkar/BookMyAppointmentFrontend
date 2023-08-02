import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRegistrationComponent } from './patient-registration.component';
import { Routes, RouterModule } from '@angular/router';
import { PatientRegistrationAddEditComponent } from './patient-registration-add-edit/patient-registration-add-edit.component';

const routes: Routes = [
  { path: '', component: PatientRegistrationComponent },
  { path: 'register', component: PatientRegistrationAddEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRegistrationRoutingModule { }
