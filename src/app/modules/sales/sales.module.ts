import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    OrdersComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    NgxDatatableModule
  ]
})
export class SalesModule { }
