import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPatientsComponent } from './add-patients.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: AddPatientsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPatientRoutingModule { }
