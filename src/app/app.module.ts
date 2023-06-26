import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { RequestInterceptor } from './modules/interceptor/request.interceptor';
import { ResponseInterceptor } from './modules/interceptor/response.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    SharedModule,
    
    
   
  ],

  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : RequestInterceptor, multi : true},
    {provide : HTTP_INTERCEPTORS, useClass : ResponseInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
