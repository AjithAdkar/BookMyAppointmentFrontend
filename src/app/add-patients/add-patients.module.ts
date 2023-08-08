import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPatientsComponent } from './add-patients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AddPatientRoutingModule } from './add-patient-routing.module';



@NgModule({
  declarations: [
    AddPatientsComponent
  ],
  imports: [
    CommonModule,
    AddPatientRoutingModule,
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
export class AddPatientsModule { }
