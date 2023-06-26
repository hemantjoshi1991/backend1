import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { CounterComponent } from './counter/counter.component';
import { CountUpModule } from 'ngx-countup';



@NgModule({
  declarations: [
    DashboardComponent,
    CounterComponent
 
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    SharedModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule,
    CountUpModule

    
  ],
  exports : [CounterComponent]
})
export class DashboardModule { }
