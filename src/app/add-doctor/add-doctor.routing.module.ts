import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDoctorComponent } from './add-doctor.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AddDoctorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class AddDoctorRoutingModule { }
