import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppDashboardRoutingModule } from './app-dashboard-routing.module';
import { AppDashboardComponent } from './app-dashboard.component';


@NgModule({
  declarations: [
    AppDashboardComponent
  ],
  imports: [
    CommonModule,
    AppDashboardRoutingModule
  ]
})
export class AppDashboardModule { }
