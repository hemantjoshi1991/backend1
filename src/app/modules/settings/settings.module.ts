import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfilesComponent } from './profiles/profiles.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ProfilesComponent,
    
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ]
})
export class SettingsModule { }
