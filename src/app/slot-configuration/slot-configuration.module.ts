import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotConfigurationRoutingModule } from './slot-configuration.routing.module';
import { SlotConfigurationComponent } from './slot-configuration.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [SlotConfigurationComponent],
  imports: [
    CommonModule, 
    SlotConfigurationRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule
 
  ]
})
export class SlotConfigurationModule { }
