import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FeatherIconComponent } from './component/feather-icon/feather-icon.component';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { LayoutComponent } from './component/layout/layout.component';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    FeatherIconComponent,
    BreadcrumbComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[
    FeatherIconComponent
  ]
})
export class SharedModule { }
