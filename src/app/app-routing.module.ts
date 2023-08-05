import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
      { path: 'app-dashboard', loadChildren: () => import('./app-dashboard/app-dashboard.module').then(m => m.AppDashboardModule) },
      { path: 'user-roles', loadChildren: () => import('./user-roles/user-roles.module').then(m => m.UserRolesModule) },
      {path:'slot-configuration',loadChildren:()=>import('./slot-configuration/slot-configuration.module').then(m=> m.SlotConfigurationModule)},
      { path: 'doctor-registration', loadChildren: () => import('./doctor-registration/doctor-registration.module').then(m => m.DoctorRegistrationModule) },
      { path: 'patients', loadChildren: () => import('./patient-registration/patient-registration.module').then(m => m.PatientRegistrationModule) },
      { path: '', redirectTo:'app-dashboard', pathMatch: 'full' },
      { path: 'specialization-registration',  loadChildren: () => import('./specialization-registration/specialization-registration.module').then( m=> m.SpecializationRegistrationModule)},
    ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
