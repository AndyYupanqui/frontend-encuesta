// ----------------------- Imports - Angular ------------------------------- //
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from "./core-angular-material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor'
// -------------------------- Componentes --------------------------------- //
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { MatDatepicker, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { MatTableExporterModule } from 'mat-table-exporter'

import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';

import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GeneralComponent } from './components/general/general.component';
import { CapacidadRespuestaComponent } from './components/capacidad-respuesta/capacidad-respuesta.component';
import { SeguridadComponent } from './components/seguridad/seguridad.component';
import { FiabilidadComponent } from './components/fiabilidad/fiabilidad.component';
import { EmpatiaComponent } from './components/empatia/empatia.component';
import { TangibilidadComponent } from './components/tangibilidad/tangibilidad.component';
const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    NavigationComponent,
    GeneralComponent,
    CapacidadRespuestaComponent,
    SeguridadComponent,
    FiabilidadComponent,
    EmpatiaComponent,
    TangibilidadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableExporterModule,
    PDFExportModule,
    SocketIoModule.forRoot(config),
    NgxChartsModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
