import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotConfigurationComponent } from './slot-configuration.component';


const routes: Routes = [{ path: '', component: SlotConfigurationComponent }];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],exports: [RouterModule]
})
export class SlotConfigurationRoutingModule { }
