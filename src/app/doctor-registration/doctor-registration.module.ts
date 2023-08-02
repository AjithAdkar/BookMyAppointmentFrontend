import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRegistrationComponent } from './doctor-registration.component';
import { DoctorRegistrationRoutingModule } from './doctor-registration.routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { ShowDoctorDetailsComponent } from './show-doctor-details/show-doctor-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    DoctorRegistrationComponent,
    ShowDoctorDetailsComponent,
  ],
  imports: [
    CommonModule,
    DoctorRegistrationRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class DoctorRegistrationModule { }
