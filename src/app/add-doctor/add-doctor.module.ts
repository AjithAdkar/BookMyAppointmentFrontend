import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDoctorComponent } from './add-doctor.component';
import { AddDoctorRoutingModule } from './add-doctor.routing.module';
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



@NgModule({
  declarations: [
    AddDoctorComponent
  ],
  imports: [
      CommonModule,
      AddDoctorRoutingModule,
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
export class AddDoctorModule { }
