import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpecializationRegistrationComponent } from './specialization-registration.component';
import { SpecializationRegistrationAddEditComponent } from './specialization-registration-add-edit/specialization-registration-add-edit.component';
import { SpecializationRegistrationRoutingModule } from './specialization-registration-routing.module';

@NgModule({
  declarations: [
    SpecializationRegistrationComponent,
    SpecializationRegistrationAddEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpecializationRegistrationRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class SpecializationRegistrationModule { }
