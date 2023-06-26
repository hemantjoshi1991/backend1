import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { BrandlogoComponent } from './brandlogo/brandlogo.component';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { ColorComponent } from './color/color.component';
import { UsertypeComponent } from './usertype/usertype.component';
import { SizeComponent } from './size/size.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    BrandlogoComponent,
    CategoryComponent,
    TagComponent,
    ColorComponent,
    UsertypeComponent,
    SizeComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class MastersModule { }
