import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDoctorDetailsComponent } from './show-doctor-details/show-doctor-details.component';



const routes: Routes =[
  { path: '', component: ShowDoctorDetailsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRegistrationRoutingModule { }
