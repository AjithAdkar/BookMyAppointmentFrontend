import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
      { path: 'app-dashboard', loadChildren: () => import('./app-dashboard/app-dashboard.module').then(m => m.AppDashboardModule) },
      { path: 'user-roles', loadChildren: () => import('./user-roles/user-roles.module').then(m => m.UserRolesModule) },
      { path: '', redirectTo:'app-dashboard', pathMatch: 'full' },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
