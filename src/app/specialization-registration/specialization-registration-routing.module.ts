import { NgModule } from '@angular/core';
import { SpecializationRegistrationComponent } from './specialization-registration.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SpecializationRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecializationRegistrationRoutingModule { }
