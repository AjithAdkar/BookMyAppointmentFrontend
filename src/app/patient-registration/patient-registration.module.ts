import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRegistrationComponent } from './patient-registration.component';
import { PatientRegistrationRoutingModule } from './patient-registration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PatientRegistrationAddEditComponent } from './patient-registration-add-edit/patient-registration-add-edit.component';



@NgModule({
  declarations: [
    PatientRegistrationComponent,
    PatientRegistrationAddEditComponent
  ],
  imports: [
    CommonModule,
    PatientRegistrationRoutingModule,
    ReactiveFormsModule,
      FormsModule, 
      MatSelectModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatDialogModule,
      MdbFormsModule,
      MatPaginatorModule,
      MatTableModule,
      MatPaginatorModule
  ]
})
export class PatientRegistrationModule { }
